from django.urls import path
from .views import home,create_form

app_name='poll_app'

urlpatterns = [
    path('',home,name='home'),
    path('create/',create_form,name='poll_create'),
]
