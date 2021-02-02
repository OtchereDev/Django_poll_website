from django.urls import path
from .views import home

app_name='poll_app'

urlpatterns = [
    path('',home)
]
