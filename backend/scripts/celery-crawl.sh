#!/bin/sh

until
  cd data_spider
do
  echo "run spider crawl"
done
scrapy crawl espn
