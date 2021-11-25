import jwt
import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView

from .models import Item
from user.models import User
from .serializers import ItemSerializer


class ItemView(APIView):
    def get(self, request, itemId):
        # Check Auth
        payload = checkAuth(request)

        userId = User.objects.filter(steamId=payload['id'])[0].id

        item = Item.objects.filter(itemId=itemId, userId=userId)[0]

        serializer = ItemSerializer(item)

        return Response(serializer.data)


class ItemsView(APIView):
    def get(self, request):
        # Check Auth
        payload = checkAuth(request)

        userId = User.objects.filter(steamId=payload['id'])[0].id

        items = Item.objects.filter(userId=userId)

        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data)


class DepositView(APIView):

    def post(self, request):
        # Check Auth
        payload = checkAuth(request)

        items = request.data['items']

        itemsName = []

        for item in items:
            itemsName.append(item['market_hash_name'])

        # Se arriva fin qui vuol dire che gli item richiesti sono contenuti nel database e sono suoi, quindi prelevabili

        # Mandare Segnale al Bot
        # TODO MODIFY ENV
        url = 'http://localhost:8081/'

        print(itemsName)

        myobj = {
            "type": "deposit",
            "SteamId": payload['id'],
            "ItemNames": itemsName,
            "secretKey": "4d2b4759fa808f846e8d71e1bb8c1731"
        }

        x = requests.post(url, data=myobj)

        return Response(status=200)


class WithdrawView(APIView):

    def post(self, request):
        # Check Auth
        payload = checkAuth(request)

        itemsIds = request.data

        print(itemsIds)

        itemsName = []

        # controlla se quegli id sono item prelevabili
        for itemId in itemsIds["items"]:
            queryset = Item.objects.filter(itemId=itemId)
            if queryset.exists():
                if User.objects.filter(id=queryset[0].userId)[0].steamId == payload['id']:
                    print(queryset[0].name)
                    itemsName.append(queryset[0].name)
                else:
                    return
            else:
                return

        # Se arriva fin qui vuol dire che gli item richiesti sono contenuti nel database e sono suoi, quindi prelevabili

        # Mandare Segnale al Bot
        # TODO MODIFY ENV
        url = 'http://104.194.242.202:8081/'

        myobj = {
            "type": "withdraw",
            "SteamId": payload['id'],
            "ItemNames": itemsName,
            "secretKey": "4d2b4759fa808f846e8d71e1bb8c1731"
        }

        x = requests.post(url, data=myobj)
        print(x.text)

        return Response(status=200)


class SteamView(APIView):

    def post(self, request):

        information = request.data

        if information['secretKey'] != '4d2b4759fa808f846e8d71e1bb8c1731':
            return Response(status=300)

        if information['type'] == 'deposit':
            for item in information['items']:
                Item.objects.create(userId=User.objects.filter(steamId=information['steamId'])[0].id,
                                    name=item['market_hash_name'])

        if information['type'] == 'withdraw':
            for item in information['items']:
                Item.objects.filter(name=item['market_hash_name'])[0].delete()

        return Response(status=200)


def checkAuth(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!1')

    try:
        return jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!2')
