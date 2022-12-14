import json

from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

# ENUMS
class GameStatus(models.TextChoices):
    UPCOMING = "UP", _("upcoming")
    ACTIVE = "AC", _("active")
    FINISHED = "FI", _("finished")


# Create your models here.


class Team(models.Model):
    scrapy_id = models.CharField(null=False, max_length=5)
    schedule = models.JSONField(null=False)
    team_data = models.JSONField(null=True, default=None, blank=True)
    team_name = models.CharField(null=False, max_length=50)


class Game(models.Model):
    UPCOMING = "UP"
    ACTIVE = "AC"
    FINISHED = "FI"
    STATUS_CHOICES = [
        (UPCOMING, "upcoming"),
        (ACTIVE, "active"),
        (FINISHED, "finished"),
    ]

    code = models.CharField(
        null=False,
        max_length=4,
        unique=True,
        validators=[MinLengthValidator(4, "this field requires 4 characters exactly")],
    )
    status = models.CharField(
        max_length=10, choices=GameStatus.choices, default=GameStatus.UPCOMING
    )
    name = models.CharField(max_length=20, null=False)
    active = models.BooleanField(default=False, null=False)
    current_week = models.IntegerField(default=1, null=False, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    game_invites = models.ForeignKey(
        Game, on_delete=models.CASCADE, default=None, null=True, blank=True
    )


class GamePick(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    week = models.IntegerField(null=False)
    loser = models.BooleanField(null=True, default=False)
    user = models.ForeignKey("GameProfile", on_delete=models.CASCADE)


class GameProfile(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    current_pick = models.OneToOneField(
        GamePick,
        on_delete=models.CASCADE,
        related_name="current_pick",
        null=True,
        default=None,
        blank=True,
    )
    prev_picks = models.ManyToManyField(
        GamePick, related_name="prev_picks", default=None, blank=True
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
