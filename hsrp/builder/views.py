from django.shortcuts import render, get_object_or_404, get_list_or_404
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

def build_edit(request, build_id):
    context = {}

    build = get_object_or_404(Build, pk=build_id)
    relics = get_list_or_404(Relic)

    context['build'] = build
    context['relics'] = relics

    return render(request, 'builder/build_edit.html', context)