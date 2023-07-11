from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Create your views here.

def new_user(request):
    if request.method == "POST":
        user = User.objects.create_user(username=request.username, password=request.password)
        print(user)
        # CustomUser.save()

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# class MyTokenRefreshView(TokenRefreshView):
#     serializer_class = MyTokenRefreshSerializer

# user = authenticate(request, username="vaughn", password="password")

# login(request, user)

# logout(request)


