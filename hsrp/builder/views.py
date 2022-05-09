from django.shortcuts import render
from django.http import HttpResponse
from .models import Relic, Build

# Create your views here.
def index(request):
    context = {}
    
    builds = Build.objects.all()

    context['builds'] = builds
    
    return render(request, 'builder/index.html', context)

def relics(request):
    context = {}

    relics = Relic.objects.all()

    context['relics'] = relics

    return render(request, 'builder/relics.html', context)