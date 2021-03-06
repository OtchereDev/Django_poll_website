# Generated by Django 3.1.5 on 2021-02-11 09:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=550)),
                ('counts', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answers', models.ManyToManyField(to='poll_question.Answer')),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_by', models.CharField(max_length=250)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('signin_vote_only', models.BooleanField(default=False)),
                ('poll_title', models.TextField()),
                ('poll_description', models.TextField()),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('responses', models.IntegerField(default=0)),
                ('questions', models.ManyToManyField(to='poll_question.Question')),
            ],
        ),
    ]
