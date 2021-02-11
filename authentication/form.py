from django.contrib.auth.forms import UserCreationForm
from django import forms

from .models import CustomUser


class createUserForm(forms.Form):
    first_name=forms.CharField(max_length=500,error_messages={'required':'Please provide your first name'})
    last_name=forms.CharField(max_length=500,error_messages={'required':'Please provide your last name'})
    email=forms.EmailField(max_length=500,error_messages={'required':'Please provide your email'})
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        error_messages={'required':'Please provide a password'}
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        error_messages={'required':'Please provide a confirmation password'}
    )


    def clean(self):
        cleaned_data=super().clean()
        password1=cleaned_data.get('password1')
        password2=cleaned_data.get('password2')
        email=cleaned_data.get('email')

        if CustomUser.objects.filter(email=email).exists():
            # raise forms.ValidationError('Email already in user')
            self.add_error('email','Email already in use')

        if password1 != password2:
            # raise forms.ValidationError('Both password do not match')
            self.add_error('password1','Both password do not match')

