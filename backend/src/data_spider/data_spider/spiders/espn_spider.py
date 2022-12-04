import scrapy

class EspnSpider(scrapy.Spider):
  name = "espn"

  def start_requests(self):
    urls = [
      "https://www.espn.com/nfl/team/_/name/lac/",
      "https://www.espn.com/nfl/team/_/name/lar/",
      "https://www.espn.com/nfl/team/_/name/pit/",
    ]

    for url in urls:
      yield scrapy.Request(url=url, callback=self.get_team_schedule)

  def get_team_schedule(self, response):
    yield {
      'team_schedule': response.css('.Schedule__Team::text').getall()
    }

  def parse(self, response):
    pass
