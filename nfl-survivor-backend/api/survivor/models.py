from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50, null=False)
    password = models.CharField(null=False, max_length=200)


class Result(models.Model):
    winner = models.OneToOneField(User, on_delete=models.CASCADE)


class Game(models.Model):
    code = models.CharField(null=False, max_length=200)
    name = models.CharField(max_length=20, null=False)
    players = models.ManyToManyField(User)
    result = models.OneToOneField(Result, on_delete=models.CASCADE)


# matt_user = User(username="matt", password="password")
# game_1 = Game(code="1234", name="test", winner=None, users=matt_user)
