import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponseNotAllowed, HttpResponse
from .models import GameModel
from django.views.decorators.csrf import csrf_exempt
from .serializers import GameSerializer
from rest_framework.response import Response
from rest_framework import generics


# Create your views here.

# def new_user(request):
#     if request.method == "POST":
#         user = User.objects.create_user(username=request.username, password=request.password)
#         print(user)
        # CustomUser.save()

@csrf_exempt
def add_game(request):
    print(request.body, "HERE")
    body = request.body
    request_title = body['title']
    request_image = body['image']

    print(request_title)
    print(request_image)

    if request.method == 'POST':
        data = GameModel.objects.create(
            title=request_title, image=request_image)
        
        return HttpResponse(data, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['POST'])





class GetGameView(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return (GameModel.objects.all())
    
@csrf_exempt
def delete_game(request, game_id):
    game_record = get_object_or_404(GameModel, id=game_id)

    if request.method == 'DELETE':
        game_record.delete()
        return HttpResponse(game_record, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['DELETE'])



