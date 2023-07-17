from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from .models import CustomUser
from .serializers import CustomUser, CustomRegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from dj_rest_auth.registration.views import RegisterView
from django.contrib.auth import get_user_model
from rest_framework import generics
import json



# Create your views here.

def new_user(request):
    if request.method == "POST":
        user = User.objects.create_user(username=request.username, password=request.password, token=request.key)
        print(user)
        CustomUser.save()

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
    def post(self, serializer):
        print("HEREREERERE", self)
        data = serializer.data
        data["username"] = self.request.data["username"]
        data["password"] = self.request.data["password"]
        data["key"] = self.request.data["key"]


        user = get_user_model()
        user.save()
        print(user)

        # return user
        return HttpResponse(json.dumps({'status': 'success', 'user': user}, content_type='application/json'))
    
    
class GetUsersView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        print(CustomUser.objects.all(), "OBJECT")
        return (CustomUser.objects.all())