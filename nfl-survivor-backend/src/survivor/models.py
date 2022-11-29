from django.db import models
from django.contrib.auth.models import User as DjangoUser
# Create your models here.


class Game(models.Model):
    code = models.CharField(null=False, max_length=200)
    name = models.CharField(max_length=20, null=False)


class User(models.Model):
    user = models.OneToOneField(DjangoUser, on_delete=models.CASCADE)
    games = models.ForeignKey(Game, null=True, on_delete=models.CASCADE, default=None, blank=True)


# matt_user = User(username="matt", password="password")
# test_user = User(username="test", password="password")
# test_user.save()
# game = Game(code="123", name="test")
# game.save()
