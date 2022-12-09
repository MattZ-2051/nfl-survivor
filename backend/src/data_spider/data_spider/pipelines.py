# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json


class DataSpiderPipeline:
    pass
    # def __init__(self, unique_id) -> None:
    #     self.unique_id = unique_id
    #     self.items = []

    # def process_item(self, item, spider):
    #     print('scraped item', item)
    #     return item

    # @classmethod
    # def from_crawler(cls, crawler):
    #   return cls(
    #     unique_id=crawler.settings.get('unique_id'),
    #   )

    # def close_spider(self, spider):
    #     item = ScrapyItem()
    #     item.unique_id = self.unique_id
    #     item.data = json.dumps(self.items)
