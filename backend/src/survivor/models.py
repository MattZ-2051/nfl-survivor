import json
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.db import models

# Create your models here.


class Team(models.Model):
    scrapy_id = models.CharField(null=False, max_length=5)
    schedule = models.JSONField(null=False)
    team_data = models.JSONField(null=True, default=None, blank=True)


class Game(models.Model):
    code = models.CharField(
        null=False,
        max_length=4,
        unique=True,
        validators=[MinLengthValidator(4, "this field requires 4 characters exactly")],
    )
    name = models.CharField(max_length=20, null=False)
    active = models.BooleanField(default=False, null=False, blank=True)
    current_week = models.IntegerField(default=0, null=False, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    game_invites = models.ForeignKey(
        Game, on_delete=models.CASCADE, default=None, null=True, blank=True
    )


class GameProfile(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    current_pick = models.OneToOneField(
        Team,
        on_delete=models.CASCADE,
        related_name="current_pick",
        null=True,
        default=None,
        blank=True,
    )
    prev_picks = models.ManyToManyField(
        Team, related_name="prev_picks", null=True, default=None, blank=True
    )
    is_loser = models.BooleanField(default=False, null=False)
    is_winner = models.BooleanField(default=False, null=False)
    is_owner = models.BooleanField(default=False, null=False)


class ScrapyItem(models.Model):
    unique_id = models.CharField(max_length=100, null=True)
    data = models.TextField()  # this stands for our crawled data
    date = models.DateTimeField(default=timezone.now)

    # This is for basic and custom serialisation to return it to client as a JSON.
    @property
    def to_dict(self):
        data = {"data": json.loads(self.data), "date": self.date}
        return data

    def __str__(self):
        return self.unique_id
