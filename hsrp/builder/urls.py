from django.urls import path
from . import views

app_name="builder"

urlpatterns = [
    path('', views.index, name='index'),
    path('relics/', views.relics, name='relics'),
    path('edit/<int:build_id>/', views.build_edit, name='build_edit'),
    path('new/', views.new_build, name='new_build')
    # path('<int:question_id>/', views.detail, name='detail'),
    # path('<int:question_id>/results/', views.results, name='results'),
    # path('<int:question_id>/vote/', views.vote, name='vote'),
]