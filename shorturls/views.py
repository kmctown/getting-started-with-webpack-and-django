import json
import string
import random
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ShortUrl

def index(request):
    return render_to_response('index.html')

@csrf_exempt
def save(request):
    if request.method == 'POST':
        response_data = []

        for short_url in json.loads(request.body):
            print "Saving %s" % short_url

            saved_url = ShortUrl.objects.create(
                short_id=get_short_id(),
                url=short_url['url']
            )

            response_url = {}
            response_url['short_id'] = "http://kmc.io/%s" % saved_url.short_id
            response_url['url'] = saved_url.url
            response_url['clicks'] = saved_url.clicks
            response_url['created_at'] = saved_url.created_at
            response_data.append(response_url)

        return HttpResponse(
            json.dumps(response_data, default=date_handler),
            content_type="application/json"
        )
    else:
        return HttpResponse(status=400)

def get_short_id():
    length = 6
    char = string.ascii_uppercase + string.digits + string.ascii_lowercase
    while True:
        short_id = ''.join(random.choice(char) for x in range(length))
        try:
            temp = ShortUrl.objects.get(short_id=short_id)
        except:
            return short_id.lower()

def date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        raise TypeError
