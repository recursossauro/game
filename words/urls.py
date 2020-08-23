from django.urls import path


from .views import (
    WordListView,
    WordCreateView,
    WordUpadateView,
    WordDeleteView,
)

urlpatterns = [

    path('', WordListView.as_view(), name='words'),
    path('<slug:slugmaster>/<int:pkgamer>/newword/', WordCreateView.as_view(),name='newword'),
    path('<slug:slugmaster>/<int:pkgamer>/<int:pk>/updateword/', WordUpadateView.as_view(), name='updateword'),
    path('<slug:slugmaster>/<int:pkgamer>/<int:pk>/deleteword/', WordDeleteView.as_view(), name='deleteword'),

]
