from django.urls import path,include
from django.contrib.auth import views

from .views import signup,LogIn

app_name='auth'

urlpatterns = [
    path('login/',LogIn.as_view(),name='login'),
    path('',include('django.contrib.auth.urls')),
    path('signup',signup,name='signup'),
]
