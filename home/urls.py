

from django.contrib import admin
from django.urls import path

from home import views

urlpatterns = [
    path('api/weather/',views.data,name='DATA'),
    path('',views.index,name='HOME'),
]
