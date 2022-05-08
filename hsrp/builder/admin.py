from django.contrib import admin

from .models import Build, Relic, StatIncreases

# Register your models here.
class BuildAdmin(admin.ModelAdmin):
    filter_horizontal = ('relics',)

admin.site.register(Build, BuildAdmin)
admin.site.register(Relic)
admin.site.register(StatIncreases)