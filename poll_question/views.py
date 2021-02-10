from django.shortcuts import render
from .form import TestForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Poll,Question,Answer

import json
from string import ascii_uppercase
# Create your views here.

@csrf_exempt
def returnUser(request):
    if request.method=='POST':
        if request.user.is_authenticated:
            return JsonResponse({
                'user':request.user.username
            })
        else:
            return JsonResponse({
                'user':None
            })

def home(request):
    form=TestForm()
    poll=Poll.objects.all()
    if request.method=='POST':
       for i in request.POST.keys():
           if 'question' in i:
               print(i)
        # print((request.POST).keys())
    return render(request,'index.html',context={
        'form':form,
        'poll':poll
    })


@csrf_exempt
def create_form(request):
    if request.method=='POST':
        data=json.loads(request.body)
        about=data[0]
   
        question_answer=data[1:]
        poll=Poll.objects.create(poll_title=about['poll_title'],poll_description=about['poll_description'])

        
        for i in question_answer:
            answer_list=[]
            question=''
            
            for k,j in i.items():
                if 'answer' in k:
                    answer_list.append(j)
                elif 'question' in k:
                    question=j

            poll_question=Question.objects.create(question=question)
            for k in answer_list:
                answer=Answer.objects.create(content=k)
                poll_question.answers.add(answer)
            
            poll.questions.add(poll_question)

        return JsonResponse({'all': 'good'})
    return render(request, 'poll/create.html', {})

def take_poll(request,uuid):
    poll=Poll.objects.filter(uuid=uuid).first() 
    return render(request,'poll/take_poll.html',{'poll':poll,'letters':ascii_uppercase})





@csrf_exempt
def answers(request):
    if request.method=='POST':
        data=json.loads(request.body)
        poll=Poll.objects.filter(uuid=data['uuid']).first()
        answers=[i.answers.all() for i in poll.questions.all()]
        selected_answers=[]

        for index,listobj in enumerate(answers):
            i=data['answers'][index]
           
            if i != None:
                i=i-1
                j=listobj[i]
                j.counts+=1
                j.save()
        
        poll.responses+=1
        poll.save()
        


        

        response=[j.counts for i in answers  for j in i]

    return JsonResponse({'response':response,'poll_count':poll.responses})
    

# poll templates needed :
# homepage
# sign up
# sign in
# sign out 
# create a poll
# take a poll 
# poll results**