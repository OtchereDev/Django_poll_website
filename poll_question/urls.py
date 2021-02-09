from django.urls import path
from .views import home,create_form,take_poll,answers

app_name='poll_app'

urlpatterns = [
    path('',home,name='home'),
    path('create/',create_form,name='poll_create'),
    path('take_poll/',take_poll,name='take_poll'),
    path('answers/',answers,name='answers'),
]
