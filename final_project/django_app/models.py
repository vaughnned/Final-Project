from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# class CustomUser(AbstractUser):
#     username = models.TextField()
#     password = models.TextField()
#     avatar = models.ImageField(upload_to='images/')
#     id = models.IntegerField(primary_key=True)

# add a user ID for filtering
# game ID
# house rules
class GameModel(models.Model):
    # title = models.TextField()
    # image = models.ImageField(upload_to='images/')
    house_rules = models.TextField()
    game_atlas_id = models.TextField()
    user_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)



    def __str__(self):
        return self.title

# class CollectionModel(models.Model):
#     id = models.IntegerField(primary_key=True)
#     game_list = GameModel
