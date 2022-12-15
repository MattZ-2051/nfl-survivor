from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from survivor.models import Team
from ..serializers.team import TeamSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def getTeams(request):
    queryset = Team.objects.all()
    serializer = TeamSerializer(queryset, many=True)
    return Response({"teams": serializer.data})
