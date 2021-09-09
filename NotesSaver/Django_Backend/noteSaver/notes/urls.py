from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('save/', views.save),
    path('showAll/', views.show),
    path('update/', views.update),
    path('delete/', views.delete),
]