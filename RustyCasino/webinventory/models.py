from django.db import models


class Item(models.Model):
    itemId = models.IntegerField(primary_key=True)
    userId = models.IntegerField()
    inInventory = models.BooleanField(default=False)
    name = models.CharField(max_length=100, default='default')
    depositDate = models.DateTimeField()
    withDate = models.DateTimeField(default=None)

    def __str__(self):
        return str(self.itemId)
