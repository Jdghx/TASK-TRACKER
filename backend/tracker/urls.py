from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.get_tasks),
    path('tasks/create/', views.create_task),
    path('tasks/<int:pk>/update/', views.update_task),
    path('tasks/<int:pk>/delete/', views.delete_task),
]
