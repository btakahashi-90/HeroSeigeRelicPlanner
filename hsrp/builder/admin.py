from django.contrib import admin

from .models import Build, Relic, StatIncreases

# Register your models here.
class BuildAdmin(admin.ModelAdmin):
    filter_horizontal = ('relics',)

class RelicAdmin(admin.ModelAdmin):
    # adjusting the Relic list display
    list_display = ('name', 'description')
    list_filter = ['is_active_relic']
    search_fields = ['description']

admin.site.register(Build, BuildAdmin)
admin.site.register(Relic, RelicAdmin)
admin.site.register(StatIncreases)