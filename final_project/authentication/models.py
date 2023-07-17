from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):
    username = models.TextField(unique=True)
    password = models.TextField()
    avatar = models.ImageField(default="")


    def __str__(self):
        return self.username