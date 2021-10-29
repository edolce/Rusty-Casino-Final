from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=60)
    steamKey = models.CharField(max_length=60)
    referral = models.CharField(max_length=60)
    level = models.FloatField(default=0)
    codeRedeemed = models.IntegerField(default=0)
    lang = models.CharField(max_length=20,default="eng")
    regDate = models.DateTimeField()
    lastLogDate = models.DateTimeField()
    totalUSDWin = models.FloatField(default=0)
    totalUSDLoses = models.FloatField(default=0)
    totalUSDProfit = models.FloatField(default=0)

    wins = models.IntegerField(default=0)

    def __str__(self):
        return self.username


class Items(models.Model):
    id = models.ForeignKey
    userId = models.BigIntegerField
    itemName = models.CharField(max_length=60)
    value = models.FloatField

    # Decide identification of item for steam

    def __str__(self):
        return self.itemName


class BotItems(models.Model):
    id = models.ForeignKey
    itemName = models.CharField(max_length=60)
    value = models.FloatField

    def __str__(self):
        return self.itemName
