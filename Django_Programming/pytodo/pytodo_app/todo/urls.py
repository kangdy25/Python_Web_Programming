from django.urls import path

from .views import TodosAPIView, TodoAPIView, TodoDoneAPIView, TodosDoneAPIView

urlpatterns = [
    path('todo/', TodosAPIView.as_view()),
    path('todo/<int:pk>/', TodoAPIView.as_view()),
    path('done/', TodosDoneAPIView.as_view()),
    path('done/<int:pk>/', TodoDoneAPIView.as_view()),
]