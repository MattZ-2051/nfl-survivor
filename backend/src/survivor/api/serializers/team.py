from rest_framework import serializers
from survivor.models import Team


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        exclude = ["id"]
