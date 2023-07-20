import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseNotAllowed, HttpResponse
from .models import GameModel
from accounts.models import Profile, User
from django.views.decorators.csrf import csrf_exempt
from .serializers import GameSerializer
from accounts.serializers import ProfileSerializer, UserSerializer
from rest_framework import generics

from django.views.decorators.csrf import ensure_csrf_cookie



# Create your views here.


# @csrf_exempt
# # @ensure_csrf_cookie
# def add_game(request):
#     body = request.body
#     decoded_data = body.decode('utf-8')
#     json_data = json.loads(decoded_data)
#     print(json_data)
#     request_id = json_data['game_atlas_id']['gameId']
#     request_title = json_data['title']['gameTitle']
#     request_image = json_data['imageUrl']['gameImageUrl']
#     # request_token = json_data['token']

#     # print(request_id)
#     print(request, "REQUEST")

#     if request.method == 'POST':
        
#         data = GameModel.objects.create(
#             game_atlas_id=request_id, title=request_title, image_url=request_image, user=request.user)
#         print(data, "DATA")
#         return HttpResponse(json.dumps({'message': 'Data saved successfully'}), content_type='application/json')
#     else:
#         return HttpResponseNotAllowed(['POST'])



class GetGameView(generics.ListCreateAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return (GameModel.objects.filter(user=self.request.user.id))
    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user)

class GetFriendsGameView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    
    @csrf_exempt
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return (GameModel.objects.filter(user=user_id))
    
class GetAvatarView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        print(self.kwargs, "SELF")
        id = self.kwargs["pk"]
        return Profile.objects.filter(user_id=id)
    def perform_create(self, serializer):
        print(self.request, "REQUEST")
        serializer.save(image=self.request)
        
    
class UpdateGameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GameSerializer
    # queryset = GameModel.objects.filter(id=game_id)

    # @csrf_exempt
    def get_queryset(self):
        print(self, "SELF")
        id = self.kwargs['pk']
        return (GameModel.objects.filter(id=id))
    # def partial_update(self, serializer):
    #     serializer.update(house_rules=self.request)
    
# @ensure_csrf_cookie
@csrf_exempt
def delete_game(request, game_id):
    game_record = get_object_or_404(GameModel, id=game_id)

    if request.method == 'DELETE':
        game_record.delete()
        return HttpResponse(game_record, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['DELETE'])





