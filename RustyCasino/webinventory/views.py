import jwt
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


def checkAuth(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('Unauthenticated!1')

    try:
        return jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!2')
