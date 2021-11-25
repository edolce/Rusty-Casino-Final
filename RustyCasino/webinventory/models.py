from django.db import models


class Item(models.Model):
    itemId = models.IntegerField(primary_key=True)
    userId = models.IntegerField()
    name = models.CharField(max_length=100, default='default')

    def __str__(self):
        return str(self.itemId)
