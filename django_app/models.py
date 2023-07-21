from django.db import models
from django.conf import settings

# Create your models here.

class GameModel(models.Model):
    user =  models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="game", on_delete=models.CASCADE, blank=True
    )
    house_rules = models.TextField(max_length=500, default="")
    title = models.TextField(max_length=100)
    image_url = models.TextField(max_length=500)
    game_atlas_id = models.TextField(max_length=50, default="")


    def __str__(self):
        return self.house_rules
