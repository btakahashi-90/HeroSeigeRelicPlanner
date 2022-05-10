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

    if request.method == 'POST':
        error_message = ""
        build.relics.clear()
        for key in request.POST:
            if "relic" in key:
                try:
                    build.relics.add(Relic.objects.get(pk=int(request.POST[key])))
                except:
                    error_message += key + " not found.\n"
        if len(error_message) > 0:
            context["error_message"] = error_message
            
    context['build'] = build
    context['relics'] = relics

    return render(request, 'builder/build_edit.html', context)

def new_build(request):
    if request.method == 'POST':
        new_build = Build(name=request.POST["build_name"])
        new_build.save()
        return build_edit(request, new_build.id)

    return render(request, 'builder/new_build.html')