from rest_framework.serializers import Serializer, ModelSerializer
from survivor.models import UserProfile


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["user", "games"]
        read_only_fields = ["user"]
