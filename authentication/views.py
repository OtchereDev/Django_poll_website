from django.shortcuts import render,redirect
from .form import createUserForm
from .models import CustomUser
from django.contrib.auth.views import auth_login,LoginView
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.messages.views import SuccessMessageMixin


def signup(request):
    form=createUserForm(request.POST or None)

    if form.is_valid():
        
        data=form.cleaned_data

        user=CustomUser.objects.create_user(email=data['email'],first_name=data['first_name'],
                                            password=data['password1'],)

        if user:
            auth_login(request,user=user)
            messages.add_message(request, messages.INFO, 'Successfully created an account')

            return redirect('poll_app:home')

        
        print(user)
        

    return render(request,'registration/signup.html',{
        'form':form
    })

# class LogIn(SuccessMessageMixin,LoginView):
#     success_message='Successfully signed in.'
#     success_url='/'

class LogIn(SuccessMessageMixin, LoginView):
    template_name = 'registration/login.html'
    success_url = 'poll_app:home'
    success_message = "You were successfully logged in."


