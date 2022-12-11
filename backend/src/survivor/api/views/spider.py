from scrapyd_api import ScrapydAPI
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from uuid import uuid4
from urllib.parse import urlparse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

scrapyd = ScrapydAPI("http://localhost:6800", timeout=5)


def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url)  # check if url format is valid
    except ValidationError:
        return False

    return True


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def crawl(request):
    # url = request.GET.get("url", None)

    # if not url:
    #     return Response(
    #         "Missing URL", status=status.HTTP_400_BAD_REQUEST, exception=True
    #     )
    # Post requests are for new crawling tasks
    # if not is_valid_url(url):
    #     return Response(
    #         "URL is invalid", status=status.HTTP_400_BAD_REQUEST, exception=True
    #     )

    # domain = urlparse(url).netloc

    unique_id = str(uuid4())

    settings = {
        "unique_id": unique_id,  # unique ID for each record for DB
        "USER_AGENT": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    }

    task = scrapyd.schedule(
        "default", "espn", settings=settings
    )
    print('task', task)
    job_status = scrapyd.list_jobs("default")
    print("status", job_status)
    return Response("crawling")
