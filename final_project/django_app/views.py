from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import GameModel
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

# def new_user(request):
#     if request.method == "POST":
#         user = User.objects.create_user(username=request.username, password=request.password)
#         print(user)
        # CustomUser.save()

@csrf_exempt
def add_to_collection(request):
    print(request, "HERE")
    print(request.body.image, "bodyyyyy")
    print(request.image, "image")
    if request.method == 'POST':
        data = GameModel.objects.create(
            title=request.data['title'], image=request.data['image'])
        return JsonResponse(data, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['POST'])

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# class MyTokenRefreshView(TokenRefreshView):
#     serializer_class = MyTokenRefreshSerializer

# user = authenticate(request, username="vaughn", password="password")

# login(request, user)

# logout(request)


