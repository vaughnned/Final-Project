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
#         CustomUser.save()

@csrf_exempt
def add_game(request):
    body = request.body
    decoded_data = body.decode('utf-8')
    json_data = json.loads(decoded_data)
    print(json_data)
    request_id = json_data['game_atlas_id']['gameId']
    request_title = json_data['title']['gameTitle']
    request_image = json_data['imageUrl']['gameImageUrl']
    print(request_id)
    print(request, "REQUEST")

    if request.method == 'POST':
        data = GameModel.objects.create(
            game_atlas_id=request_id, title=request_title, image_url=request_image)
        print(data, "DATA")
        return HttpResponse(json.dumps({'message': 'Data saved successfully'}), content_type='application/json')
    else:
        return HttpResponseNotAllowed(['POST'])


class GetGameView(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        print(GameModel.objects.all(), "OBJECT")
        return (GameModel.objects.all())
    
    
@csrf_exempt
def delete_game(request, game_id):
    game_record = get_object_or_404(GameModel, id=game_id)

    if request.method == 'DELETE':
        game_record.delete()
        return HttpResponse(game_record, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['DELETE'])



