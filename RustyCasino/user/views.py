import datetime
import jwt
from django.http import HttpResponse, HttpResponseRedirect
# views.py
from django.shortcuts import redirect
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from steamauth import auth, get_uid
from .models import User

import requests
import json
# Create your views here.


# GET /login
from .serializers import UserSerializer

key = "2A11B273D8DD033654103AAEBE9325B7"


def login(request):
    # if your service does not support ssl, set use_ssl parameters value to False
    return auth('/user/logincallback', use_ssl=False)
    # return auth('/callback')


# GET /process

class LoginCallback(APIView):
    def get(self, request):
        steam_uid = get_uid(request.GET)
        if steam_uid is None:
            # login failed
            return redirect('/user/login_failed')
        else:
            # login success

            # todo: If user not inside database, insert it and register regDate
            user = User.objects.filter(steamId=steam_uid)

            if not user:
                # No user in database  so insert it
                user = User(steamId=steam_uid, referral=steam_uid + "ref", regDate=datetime.datetime.utcnow(),
                            lastLogDate=datetime.datetime.utcnow())
                user.save()

            # todo: Register LastLogDate

            user.lastLogDate = datetime.datetime.utcnow()

            payload = {
                'id': steam_uid,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }

            token = jwt.encode(payload, 'secret', algorithm='HS256')

            response = HttpResponseRedirect('https://127.0.0.1:9090/profile')

            response.set_cookie(key='jwt', value=token, httponly=True)

            return response


class Logout(APIView):
    def get(self, request):
        response = HttpResponseRedirect('https://127.0.0.1:9090/profile')
        response.set_cookie(key='jwt', value=None, expires=datetime.datetime.utcnow(), httponly=True)
        return response


class UserData(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!1')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!2')

        user = User.objects.filter(steamId=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CheckSession(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        return Response("success!")

class SteamData(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        steamId = payload['id']

        url = f'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={key}&steamids={steamId}'

        r = requests.get(url)

        data = r.json()['response']["players"][0]

        username = data["personaname"]
        profileUrl = data["profileurl"]
        # Avatar url: https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1
        # /f1dd60a188883caf82d0cbfccfe6aba0af1732d4_full.jpg
        avatarHash = data["avatarhash"]

        return Response({
            "steamId": steamId,
            "username": username,
            "profileUrl": profileUrl,
            "avatarHash": avatarHash,
        })


def login_failed(request):
    html = "<html><body>Failed</body></html>"
    return HttpResponse(html)
