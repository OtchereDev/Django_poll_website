# Generated by Django 3.1.5 on 2021-02-12 09:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poll_question', '0002_auto_20210211_1958'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poll',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]