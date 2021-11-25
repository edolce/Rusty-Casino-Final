from django.urls import include, path
from . import views
from .views import ItemView, ItemsView, DepositView, WithdrawView, SteamView

urlpatterns = [
    #need auth
    path('item/<int:itemId>', ItemView.as_view()),
    # need auth
    path('items', ItemsView.as_view()),
    # need auth
    path('deposit', DepositView.as_view()),
    # need auth
    path('withdraw', WithdrawView.as_view()),
    # PRIVATE
    path('steam/accepted', SteamView.as_view()),
]