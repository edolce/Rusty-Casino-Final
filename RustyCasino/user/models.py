from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    steamKey = models.CharField(max_length=60)
    referral = models.CharField(max_length=60)
    level = models.FloatField(default=0)
    codesRedeemed = models.IntegerField(default=0)
    lang = models.CharField(max_length=20, default="eng")
    regDate = models.DateTimeField()
    lastLogDate = models.DateTimeField()

    def __str__(self):
        return self.id
