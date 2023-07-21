from rest_framework import serializers
from .models import GameModel

class GameSerializer(serializers.ModelSerializer):
    house_rules = serializers.CharField(max_length=500, default="")
    title = serializers.CharField(max_length=100)
    image_url = serializers.CharField(max_length=500)
    game_atlas_id = serializers.CharField(max_length=50, default="")



    class Meta:
        model = GameModel
        fields = "__all__"
        depth = 1
