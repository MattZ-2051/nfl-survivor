from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, password_validation as validators
from django.core import exceptions
from survivor.models import UserProfile
from .game import GameSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    game_invites = GameSerializer(many=False)

    class Meta:
        model = UserProfile
        fields = ["game_invites"]
        read_only_fields = ["game_invites"]


class CreateUserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        min_length=4,
        max_length=20,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(min_length=6)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "username": {"read_only": True},
        }

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data["username"], password=validated_data["password"]
        )
        return user

    def get_user(self):
        user = User.objects.get(id=self.data["id"])
        return user

    def validate(self, data):
        password = data.get("password")
        errors = dict()

        try:
            # validate the password and catch the exception
            validators.validate_password(password=password)
        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors["password"] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)

        return super(CreateUserProfileSerializer, self).validate(data)
