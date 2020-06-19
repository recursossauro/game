from django.urls import path


from .views import (
    WordListView,
    WordCreateView,
    WordUpadateView,
    WordDeleteView,
)

urlpatterns = [

    path('', WordListView.as_view(), name='words'),
    path('novapalavra/', WordCreateView.as_view(),name='newword'),
    path('<int:pk>/alterapalavra/', WordUpadateView.as_view(), name='updateword'),
    path('<int:pk>/excluipalavra/', WordDeleteView.as_view(), name='deleteword'),

]
