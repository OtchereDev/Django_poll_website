from django.db import models

from authentication.models import CustomUser

import uuid


class Poll(models.Model):
    poll_title=models.TextField()
    poll_description=models.TextField()
    questions=models.ManyToManyField('Question')
    responses=models.ManyToManyField('Voter')
    uuid=models.UUIDField(default=uuid.uuid4, editable=False)
    signin_vote_only=models.BooleanField(default=False)
    created_by=models.CharField(max_length=250)
    date_created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.poll_title +'--'+str(self.uuid)
    


class Question(models.Model):
    question=models.TextField()
    answers=models.ManyToManyField('Answer')

    def __str__(self):
        return self.question


class Answer(models.Model):
    content=models.CharField(max_length=550)
    counts=models.IntegerField(default=0)

    def __str__(self):
        return self.content
    

class Voter(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,blank=True)
    browser_id=models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        if self.user:
            return str(self.user)
        else:
            return self.browser_id
    