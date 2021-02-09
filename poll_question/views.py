from django.shortcuts import render
from .form import TestForm

# Create your views here.

def home(request):
    form=TestForm()
    if request.method=='POST':
       for i in request.POST.keys():
           if 'question' in i:
               print(i)
        # print((request.POST).keys())
    return render(request,'index.html',context={
        'form':form
    })

def create_form(request):
    return render(request, 'poll/create.html', {})

def take_poll(request):
    return render(request,'poll/take_poll.html')
    

# poll templates needed :
# homepage
# sign up
# sign in
# sign out 
# create a poll
# take a poll 
# poll results**