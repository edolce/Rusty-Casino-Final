# serializers.py
from rest_framework import serializers

from .models import Hero
from .models import Items
from .models import BotItems
from .models import Users


class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = (
            'id', 'usernafdsfsdme', 'steamKey', 'referral', 'level', 'codeRedeemed', 'lang', 'regDate',
            'lastLogDate', 'totalUSDWin', 'totalUSDLoses', 'totalUSDProfit', 'wins')
