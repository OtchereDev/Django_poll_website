from django.db import models

import uuid


class Poll(models.Model):
    questions=models.ManyToManyField('Question')
    created_by=models.CharField(max_length=250)
    date_created=models.DateTimeField(auto_now_add=True)
    signin_vote_only=models.BooleanField(default=False)
    poll_title=models.TextField()
    poll_description=models.TextField()
    uuid=models.UUIDField(default=uuid.uuid4, editable=False)
    responses=models.IntegerField(default=0)

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
    
