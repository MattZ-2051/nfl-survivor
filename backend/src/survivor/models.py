from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Game(models.Model):
    code = models.CharField(null=False, max_length=200)
    name = models.CharField(max_length=20, null=False)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games = models.ForeignKey(
        Game, null=True, on_delete=models.CASCADE, default=None, blank=True
    )
