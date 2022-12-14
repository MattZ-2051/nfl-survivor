import scrapy
import re
from .urls import schedule, info


class EspnSpider(scrapy.Spider):
    name = "espn"

    def start_requests(self):

        for url in schedule:
            yield scrapy.Request(url=url, callback=self.get_team_schedule)
        for url in info:
            yield scrapy.Request(url=url, callback=self.get_bye_week)

    def get_bye_week(self, response):
        result = response.css(".Table__TR ::text").getall()
        bye_week = result[result.index("BYE WEEK") - 1]
        yield {
            "bye": bye_week,
            "team_id": response.url.split("/")[
                response.url.split("/").index("name") + 1
            ],
        }

    def get_team_schedule(self, response):
        team_id = response.url.split("/")[response.url.split("/").index("name") + 1]
        team_results = response.css(".Schedule__Game__Wrapper div span::text").getall()
        team_name = response.css(".ClubhouseHeader__Name span::text").getall()
        team_schedule = []
        team_games = [
            item.split() for item in re.split(r"@|vs", " ".join(team_results)) if item
        ]

        for index, item in enumerate(team_games[:-3]):
            new_data = {}
            new_data["week"] = f"{index + 1}"
            if len(item) == 3:
                team = item[0]
                result = item[1]
                score = item[2]
                new_data["team"] = team
                new_data["result"] = result
                new_data["score"] = score
            if len(item) > 3:
                team = item[0]
                new_data["team"] = team
                new_data["result"] = "upcoming"
                new_data["score"] = "tbd"
            team_schedule.append(new_data)

        yield {
            "team_schedule": team_schedule,
            "team_id": team_id,
            "team_name": " ".join(team_name),
        }

    def parse(self, response):
        pass
