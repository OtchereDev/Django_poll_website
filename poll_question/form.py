from django import forms
from .models import Poll

class TestForm(forms.ModelForm):
    class Meta:
        model=Poll
        fields='__all__'
