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
    house_rules = models.TextField(max_length=500, default="")
    title = models.TextField(max_length=100)
    image_url = models.TextField(max_length=500)
    game_atlas_id = models.TextField(max_length=50, default="")
    user_id = models.IntegerField(null=True)
    # model_id = models.IntegerField(primary_key=True)



    def __str__(self):
        return self.house_rules

# class CollectionModel(models.Model):
#     id = models.IntegerField(primary_key=True)
#     game_list = GameModel
