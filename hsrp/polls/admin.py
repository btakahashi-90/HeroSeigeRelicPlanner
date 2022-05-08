from django.contrib import admin

from .models import Question, Choice

# Register your models here.
class ChoiceInline(admin.TabularInline): # Can use StackedInLine, will make fields "stacked", as once might expect.
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    # fields = ['pub_date', 'question_text'] # "standard", no extra formatting just reordering fields
    # Separating fields to their own "areas"
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]

    # adjusting the Question list display
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']

admin.site.register(Question, QuestionAdmin)
# admin.site.register(Choice) # This would include Choice as a second separate link from question in the Admin