from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializers.user import UserProfileSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    username = request.user
    serializer = UserProfileSerializer(username, many=False)
    return Response(serializer.data)
