
from django.shortcuts import get_object_or_404
from django.http import HttpResponseNotAllowed, HttpResponse
from .models import GameModel
from accounts.models import Profile
from django.views.decorators.csrf import csrf_exempt
from .serializers import GameSerializer
from accounts.serializers import ProfileSerializer
from rest_framework import generics

from django.views.decorators.csrf import ensure_csrf_cookie



# Create your views here.


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
        return Profile.objects.filter(user=id)
    def perform_create(self, serializer):
        print(self.request, "REQUEST")
        serializer.save(image=self.request)
        
    
class UpdateGameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GameSerializer
    
    def get_queryset(self):
        print(self, "SELF")
        id = self.kwargs['pk']
        return (GameModel.objects.filter(id=id))

    

@csrf_exempt
def delete_game(request, game_id):
    game_record = get_object_or_404(GameModel, id=game_id)

    if request.method == 'DELETE':
        game_record.delete()
        return HttpResponse(game_record, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['DELETE'])





