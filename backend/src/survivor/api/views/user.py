from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from survivor.models import UserProfile
from ..serializers.user import UserProfileSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    username = request.user
    user_instance = User.objects.get(username=username)
    profile = UserProfile.objects.get(user=user_instance)
    serializer = UserProfileSerializer(profile, many=False)
    return Response(serializer.data)
