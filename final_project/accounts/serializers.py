from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from . import models
from django_app.models import GameModel
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import TokenSerializer


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
    )

    class Meta:
        model = models.User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    profile_id = serializers.ReadOnlyField(source="user.profile.id")

    class Meta:
        model = models.Profile
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    id = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = TokenModel
        fields = "__all__"


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameModel
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    games = GameSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'games')


class CustomLoginSerializer(TokenSerializer):
    user = CustomUserSerializer(read_only=True)