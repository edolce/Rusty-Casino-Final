from django.urls import include, path
from . import views
from .views import ItemView, ItemsView

urlpatterns = [
    #need auth
    path('item/<int:itemId>', ItemView.as_view()),
    # need auth
    path('items', ItemsView.as_view()),
]