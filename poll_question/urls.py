from django.urls import path
from .views import home,create_form,take_poll,answers,returnUser,poll_creation

app_name='poll_app'

urlpatterns = [
    path('',home,name='home'),
    path('create/',create_form,name='poll_create'),
    path('take_poll/<uuid:uuid>',take_poll,name='take_poll'),
    path('answers/',answers,name='answers'),
    path('users/',returnUser,name='user'),
    path('create_poll',poll_creation),
]
