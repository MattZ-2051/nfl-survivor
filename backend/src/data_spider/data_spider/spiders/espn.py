import scrapy
import json
import re


class EspnSpider(scrapy.Spider):
    name = "espn"

    def start_requests(self):
        urls = [
            "https://www.espn.com/nfl/team/_/name/lac/",
            "https://www.espn.com/nfl/team/_/name/lar/",
            "https://www.espn.com/nfl/team/_/name/pit/",
            "https://www.espn.com/nfl/team/_/name/buf/",
            "https://www.espn.com/nfl/team/_/name/mia/",
            "https://www.espn.com/nfl/team/_/name/ne/",
            "https://www.espn.com/nfl/team/_/name/nyj/",
            "https://www.espn.com/nfl/team/_/name/bal/",
            "https://www.espn.com/nfl/team/_/name/cin/",
            "https://www.espn.com/nfl/team/_/name/cle/",
            "https://www.espn.com/nfl/team/_/name/hou/",
            "https://www.espn.com/nfl/team/_/name/ind/",
            "https://www.espn.com/nfl/team/_/name/jax/",
            "https://www.espn.com/nfl/team/_/name/ten/",
            "https://www.espn.com/nfl/team/_/name/den/",
            "https://www.espn.com/nfl/team/_/name/kc/",
            "https://www.espn.com/nfl/team/_/name/lv/",
            "https://www.espn.com/nfl/team/_/name/dal/",
            "https://www.espn.com/nfl/team/_/name/nyg/",
            "https://www.espn.com/nfl/team/_/name/phi/",
            "https://www.espn.com/nfl/team/_/name/wsh/",
            "https://www.espn.com/nfl/team/_/name/chi/",
            "https://www.espn.com/nfl/team/_/name/det/",
            "https://www.espn.com/nfl/team/_/name/gb/",
            "https://www.espn.com/nfl/team/_/name/min/",
            "https://www.espn.com/nfl/team/_/name/atl/",
            "https://www.espn.com/nfl/team/_/name/car/",
            "https://www.espn.com/nfl/team/_/name/no/",
            "https://www.espn.com/nfl/team/_/name/tb/",
            "https://www.espn.com/nfl/team/_/name/ari/",
            "https://www.espn.com/nfl/team/_/name/sf/",
            "https://www.espn.com/nfl/team/_/name/sea/",
        ]

        schedule = [
            "https://www.espn.com/nfl/team/schedule/_/name/lac/",
            "https://www.espn.com/nfl/team/schedule/_/name/lar/",
            "https://www.espn.com/nfl/team/schedule/_/name/pit/",
            "https://www.espn.com/nfl/team/schedule/_/name/buf/",
            "https://www.espn.com/nfl/team/schedule/_/name/mia/",
            "https://www.espn.com/nfl/team/schedule/_/name/ne/",
            "https://www.espn.com/nfl/team/schedule/_/name/nyj/",
            "https://www.espn.com/nfl/team/schedule/_/name/bal/",
            "https://www.espn.com/nfl/team/schedule/_/name/cin/",
            "https://www.espn.com/nfl/team/schedule/_/name/cle/",
            "https://www.espn.com/nfl/team/schedule/_/name/hou/",
            "https://www.espn.com/nfl/team/schedule/_/name/ind/",
            "https://www.espn.com/nfl/team/schedule/_/name/jax/",
            "https://www.espn.com/nfl/team/schedule/_/name/ten/",
            "https://www.espn.com/nfl/team/schedule/_/name/den/",
            "https://www.espn.com/nfl/team/schedule/_/name/kc/",
            "https://www.espn.com/nfl/team/schedule/_/name/lv/",
            "https://www.espn.com/nfl/team/schedule/_/name/dal/",
            "https://www.espn.com/nfl/team/schedule/_/name/nyg/",
            "https://www.espn.com/nfl/team/schedule/_/name/phi/",
            "https://www.espn.com/nfl/team/schedule/_/name/wsh/",
            "https://www.espn.com/nfl/team/schedule/_/name/chi/",
            "https://www.espn.com/nfl/team/schedule/_/name/det/",
            "https://www.espn.com/nfl/team/schedule/_/name/gb/",
            "https://www.espn.com/nfl/team/schedule/_/name/min/",
            "https://www.espn.com/nfl/team/schedule/_/name/atl/",
            "https://www.espn.com/nfl/team/schedule/_/name/car/",
            "https://www.espn.com/nfl/team/schedule/_/name/no/",
            "https://www.espn.com/nfl/team/schedule/_/name/tb/",
            "https://www.espn.com/nfl/team/schedule/_/name/ari/",
            "https://www.espn.com/nfl/team/schedule/_/name/sf/",
            "https://www.espn.com/nfl/team/schedule/_/name/sea/",
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.get_team_schedule)
        for url in schedule:
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

        yield {"team_schedule": team_schedule, "team_id": team_id}

    def parse(self, response):
        pass
