from django.contrib import admin
from .models import Hero
from .models import Users
from .models import Items
from .models import BotItems

admin.site.register(Hero)
admin.site.register(Items)
admin.site.register(BotItems)
admin.site.register(Users)
