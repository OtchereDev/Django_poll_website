from django.shortcuts import render
from .form import TestForm

# Create your views here.

def home(request):
    form=TestForm()
    return render(request,'index.html',context={
        'form':form
    })


# poll templates needed :
# homepage
# sign up
# sign in
# sign out 
# create a poll
# take a poll 
# poll results**