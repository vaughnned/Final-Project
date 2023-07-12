from rest_framework import serializers
from .models import GameModel

class GameSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    image = serializers.CharField()

    class Meta:
        model = GameModel
        fields = "__all__"
        depth = 1