# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import json
from .items import ScrapyTeamItem
from asgiref.sync import sync_to_async
from .utils import item_to_model, get_or_create, update_model


class TeamPipeline:
    @sync_to_async
    def process_item(self, data, spider):
        team_id = data.get("team_id")
        if data.get("team_schedule"):
            new_team = ScrapyTeamItem()
            new_team["scrapy_id"] = team_id
            new_team["schedule"] = json.dumps(data["team_schedule"])
            item_model = item_to_model(new_team)
            model, created = get_or_create(item_model)
            if created:
                update_model(model, item_model)

        if data.get("bye"):
            existing_team = ScrapyTeamItem()
            existing_team["scrapy_id"] = team_id
            existing_model, _ = get_or_create(item_to_model(existing_team))
            schedule = json.loads(vars(existing_model).get("schedule"))
            new_schedule = []
            bye_week_index = int(data["bye"]) - 1
            bye_week = {
                "week": data["bye"],
                "team": "bye",
                "result": "bye",
                "score": "bye",
            }
            if any(week["team"] == "bye" for week in schedule):
                return data
            else:
                for index, item in enumerate(schedule):
                    if item["week"] == "bye":
                        return
                    if index == bye_week_index:
                        new_schedule.append(bye_week)
                        item["week"] = str(int(item["week"]) + 1)
                        new_schedule.append(item)
                    elif index < bye_week_index:
                        new_schedule.append(item)
                    elif index > bye_week_index:
                        item["week"] = str(int(item["week"]) + 1)
                        new_schedule.append(item)
                new_team = ScrapyTeamItem()
                new_team["scrapy_id"] = team_id
                new_team["schedule"] = json.dumps(new_schedule)
                team_model = item_to_model(new_team)
                new_model, created = get_or_create(team_model)
                update_model(new_model, team_model)
        return data
