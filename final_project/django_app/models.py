from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# class CustomUser(AbstractUser):
#     username = models.TextField()
#     password = models.TextField()

class GameModel(models.Model):
    title = models.TextField()
    image = models.TextField()

class CollectionModel(models.Model):
    id = models.IntegerField(primary_key=True)
    game_list = GameModel
