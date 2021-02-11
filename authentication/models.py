from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

class CustomUserManager(BaseUserManager):
    
    def create_superuser(self,email,first_name,password,**other_fields):
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Super must be assigned is_staff = True')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Super must be assigned is_superuser = True')

        return self.create_user(email,first_name,password,**other_fields)

        
    def create_user(self,email,first_name,password,**other_fields):
        email=self.normalize_email(email)
        if not email:
            raise ValueError('You must provide a valid email')
        user=self.model(email=email,first_name=first_name,**other_fields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractUser):
    username=None
    email=models.EmailField(unique=True,max_length=500)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name']
    objects=CustomUserManager()

