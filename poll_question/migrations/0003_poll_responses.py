# Generated by Django 3.1.5 on 2021-02-10 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poll_question', '0002_auto_20210210_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='poll',
            name='responses',
            field=models.IntegerField(default=0),
        ),
    ]
