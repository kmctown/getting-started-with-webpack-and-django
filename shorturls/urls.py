from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='home'),
    url(r'^save/?$', save, name='save'),
]
