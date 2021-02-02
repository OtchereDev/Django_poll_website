from django.db import models


class Poll(models.Model):
    questions=models.ManyToManyField('Question')
    created_by=models.CharField(max_length=250)
    date_created=models.DateTimeField(auto_now_add=True)
    signin_vote_only=models.BooleanField(default=False)


class Question(models.Model):
    question=models.TextField()
    answers=models.ManyToManyField('Answer')


class Answer(models.Model):
    content=models.CharField(max_length=550)
    count=models.IntegerField(default=0)
