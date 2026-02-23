from django.shortcuts import render
from django.http import JsonResponse
import requests

# Create your views here.

def index(request):
    data=request.GET.get('city')
    print(data)
    return render(request,'index.html') 
def data(request):
    data=request.GET.get('city')
    import os
    key = os.environ.get("OPENWEATHER_API_KEY")
    url=f'https://api.openweathermap.org/data/2.5/weather?q={data}&appid={key}&units=metric'
    response=requests.get(url)

    if response.status_code==200:
        wd=response.json()
        we={"city": wd['name'],
            
            "temperature":wd['main']['temp'],
            "description": wd['weather'][0]['description'],
            "humidity": wd['main']['humidity'],
            "wind": wd['wind']['speed'],
            "feels_like": wd['main']['feels_like'],
            "pressure": wd['main']['pressure'],
            "icon": wd['weather'][0]['icon']}
        return JsonResponse(we)

    else:
        return JsonResponse(
            {"error": "City not found"},
            status=404
        )

    

 
