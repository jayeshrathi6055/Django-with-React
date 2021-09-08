from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import Notes
import json

# Create your views here.

def index(request):
    return HttpResponse("Hello world") 

# Create
def save(request):
    body = request.body.decode('utf-8')
    body = json.loads(body)
    new = Notes(title = body['title'], description = body['description'])
    new.save()
    obj = {"title":new.title,"description":new.description}
    return JsonResponse(obj)

# Read
def show(request):
    arr_of_obj = []
    arr = Notes.objects.all()
    for i in arr:
        o = {"title":i.title,"description":i.description}
        arr_of_obj.append(o)

    return JsonResponse(arr_of_obj,safe=False)

# Update

# Delete