from scrapyd_api import ScrapydAPI
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from uuid import uuid4
from urllib.parse import urlparse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import ScrapyItem

scrapyd = ScrapydAPI("http://localhost:6800")


def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url)  # check if url format is valid
    except ValidationError:
        return False

    return True


@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
def crawl(request):
    # Post requests are for new crawling tasks
    if request.method == "POST":

        url = request.POST.get(
            "url", None
        )  # take url comes from client. (From an input may be?)

        if not url:
            return Response({"error": "Missing  args"})

        if not is_valid_url(url):
            return Response({"error": "URL is invalid"})

        domain = urlparse(url).netloc  # parse the url and extract the domain
        unique_id = str(uuid4())  # create a unique ID.

        # This is the custom settings for scrapy spider.
        # We can send anything we want to use it inside spiders and pipelines.
        # I mean, anything
        settings = {
            "unique_id": unique_id,  # unique ID for each record for DB
            "USER_AGENT": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        }

        # Here we schedule a new crawling task from scrapyd.
        # Notice that settings is a special argument name.
        # But we can pass other arguments, though.
        # This returns a ID which belongs and will be belong to this task
        # We are goint to use that to check task's status.
        task = scrapyd.schedule(
            "default", "icrawler", settings=settings, url=url, domain=domain
        )

        return Response({"task_id": task, "unique_id": unique_id, "status": "started"})

    # Get requests are for getting result of a specific crawling task
    elif request.method == "GET":
        # We were passed these from past request above. Remember ?
        # They were trying to survive in client side.
        # Now they are here again, thankfully. <3
        # We passed them back to here to check the status of crawling
        # And if crawling is completed, we respond back with a crawled data.
        task_id = request.GET.get("task_id", None)
        unique_id = request.GET.get("unique_id", None)

        if not task_id or not unique_id:
            return Response({"error": "Missing args"})

        # Here we check status of crawling that just started a few seconds ago.
        # If it is finished, we can query from database and get results
        # If it is not finished we can return active status
        # Possible results are -> pending, running, finished
        status = scrapyd.job_status("default", task_id)
        if status == "finished":
            try:
                # this is the unique_id that we created even before crawling started.
                item = ScrapyItem.objects.get(unique_id=unique_id)
                return Response({"data": item.to_dict["data"]})
            except Exception as e:
                return Response({"error": str(e)})
        else:
            return Response({"status": status})
