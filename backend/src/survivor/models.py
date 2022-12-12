from django.db import models
from django.contrib.auth.models import User
import json
from django.db import models
from django.utils import timezone

# Create your models here.


class Team(models.Model):
    scrapy_id = models.CharField(null=False, max_length=5)
    schedule = models.JSONField(null=False)
    team_data = models.JSONField(null=True, default=None, blank=True)


class Game(models.Model):
    code = models.CharField(null=False, max_length=200)
    name = models.CharField(max_length=20, null=False)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    games = models.ForeignKey(
        Game, null=True, on_delete=models.CASCADE, default=None, blank=True
    )


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
