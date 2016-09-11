from __future__ import unicode_literals
from django.db import models

class ShortUrl(models.Model):
    short_id = models.SlugField(max_length=6, primary_key=True)
    url = models.URLField(max_length=255)
    clicks = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url
