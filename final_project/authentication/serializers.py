from rest_framework import serializers
from .models import CustomUser
from dj_rest_auth.registration.serializers import RegisterSerializer


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    avatar = serializers.ImageField()
    token = serializers.CharField(default="")


    class Meta:
        model = CustomUser
        fields = "__all__"
        depth = 1

class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    token = serializers.CharField()


    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        print(self, "SELF")
        return {
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'key': self.validated_data.get('key', ''),

        }