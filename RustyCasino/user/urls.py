from django.urls import include, path
from . import views
from .views import LoginCallback, UserData, SteamData, Logout, CheckSession

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', Logout.as_view(), name='login'),
    path('logincallback/', LoginCallback.as_view()),
    path('loginfailed/', views.login_failed, name='failed'),
    path('me/', UserData.as_view()),
    path('meSteam/', SteamData.as_view()),
    path('checksession/', CheckSession.as_view()),
]