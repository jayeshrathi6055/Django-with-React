from django.http import HttpResponse,JsonResponse
from django.utils import timezone
from .models import Notes
import json

# Create your views here.

def index(request):
    return HttpResponse("Hello world") 

# Create
def save(request):
    body = request.body.decode('utf-8')
    body = json.loads(body)
    new = Notes(title = body['title'], description = body['description'],date = timezone.now())
    new.save()
    obj = {"title":new.title,"description":new.description,"date":new.date,"id":new.id}
    return JsonResponse(obj)

# Read
def show(request):
    arr_of_obj = []
    arr = Notes.objects.all()
    for i in arr:
        o = {"title":i.title,"description":i.description,"date":i.date,"id":i.id}
        arr_of_obj.append(o)

    return JsonResponse(arr_of_obj,safe=False)

# Update By Id
def update(request):
    body = request.body.decode('utf-8')
    body = json.loads(body)
    Notes.objects.filter(id = body['id']).update(title = body['title'], description = body['description'])
    return JsonResponse({"success":True},safe=False)

# Delete By Id
def delete(request):
    body = request.body.decode('utf-8')
    body = json.loads(body)
    Notes.objects.filter(id = body['id']).delete()
    return JsonResponse({"success":True},safe=False)