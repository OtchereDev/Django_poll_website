#  heroku
# from whitenoise.django import DjangoWhiteNoise
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Django_poll_website.settings')

application = get_wsgi_application()

# heroku
# application=DjangoWhiteNoise(application)
