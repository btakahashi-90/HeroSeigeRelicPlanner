# auto redirect view so we don't have to keep doing it manually.
from django.urls import reverse
from django.http import HttpResponseRedirect

def redr(request):
    return HttpResponseRedirect(reverse('builder:index'))