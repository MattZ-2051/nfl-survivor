#!/bin/sh

pipenv shell
until
  cd src/data_spider
do
  echo "run spider crawl"
done
scrapy crawl espn
