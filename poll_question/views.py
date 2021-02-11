from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from .models import Poll,Question,Answer,Voter
from authentication.models import CustomUser

import json
from string import ascii_uppercase


@csrf_exempt
def returnUser(request):
    if request.method=='POST':
        if request.user.is_authenticated:
            return JsonResponse({
                'user':request.user.email
            })
        else:
            return JsonResponse({
                'user':None
            })


def home(request):
 
    poll=Poll.objects.all()
  
    return render(request,'poll/index.html',context={
        'poll':poll
    })


@login_required
@csrf_exempt
def create_form(request):
    if request.method=='POST':
        data=json.loads(request.body)
        about=data[0]
   
        question_answer=data[1:]
        poll=Poll.objects.create(poll_title=about['poll_title'],
                                poll_description=about['poll_description'])

        
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
    return render(request,'poll/take_poll.html',
                {'poll':poll,'letters':ascii_uppercase})


@csrf_exempt
def answers(request):
    if request.method=='POST':
        data=json.loads(request.body)
        poll=Poll.objects.filter(uuid=data['uuid']).first()
        answers=[i.answers.all() for i in poll.questions.all()]
        selected_answers=[]

        if data.get('user'):
            user=CustomUser.objects.get(email=data.get('user'))
            voted=poll.responses.all().filter(user=user).exists()

            if not voted:
                voter= Voter.objects.create(user=user)

                for index,listobj in enumerate(answers):
                    i=data['answers'][index]
                
                    if i != None:
                        i=i-1
                        j=listobj[i]
                        j.counts+=1
                        print(j.counts)
                        j.save()

            print(data.get('user'))
        elif data.get('browser_id'):
            browser_id=data.get('browser_id')
            voted=poll.responses.all().filter(browser_id=browser_id).exists()      # voter=Voter.objects.create

            if not voted:
                voter= Voter.objects.create(browser_id=browser_id)

                for index,listobj in enumerate(answers):
                    i=data['answers'][index]
                
                    if i != None:
                        i=i-1
                        j=listobj[i]
                        j.counts+=1
                        j.save()
        try:
            if voter:
                print(voter)
                poll.responses.add(voter)
        except:
            pass
        
        
        poll.save()

        current_poll_response=[i.answers.all() for i in poll.questions.all()]
        
        response=[j.counts for i in current_poll_response  for j in i]

        total_response=poll.responses.all().count()

    return JsonResponse({'response':response,'poll_count':total_response})
    

# poll templates needed :
# homepage
# sign up
# sign in
# sign out 
# create a poll
# take a poll 
# poll results**

# if data.get('user'):
#     user=CustomUser.objects.get(email=data.get('user'))
#     voted=poll.responses.all().filter(user=user).exists()

#     if not voted:
#         voter= Voter.objects.create(user=user)

#     print(data.get('user'))
# elif data.get('browser_id'):
#     browser_id=data.get('browser_id')
#     voted=poll.responses.all().filter(browser_id=browser_id).exists()      # voter=Voter.objects.create

#     if not voted:
#         voter= Voter.objects.create(browser_id=browser_id)
# try:
#     if voter:
#         poll.responses.add(voter)
# except:
#     pass