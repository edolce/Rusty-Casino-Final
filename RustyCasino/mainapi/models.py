from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class Users(models.Model):
    id = models.ForeignKey
    username = models.CharField(max_length=60)
    password = models.CharField(max_length=60)
    steamKey = models.CharField(max_length=60)
    referral = models.CharField(max_length=60)
    level = models.FloatField
    codeRedeemed = models.IntegerField
    lang = models.CharField(max_length=20)
    regDate = models.DateTimeField
    lastLogDate = models.DateTimeField
    totalUSDWin = models.FloatField
    totalUSDLoses = models.FloatField
    totalUSDProfit = models.FloatField

    wins = models.IntegerField

    inventory = models.JSONField

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

    # TEST

    #rewrwerwer



    def __str__(self):
        return self.itemName
