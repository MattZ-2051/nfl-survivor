#!/bin/sh

pipenv shell
until cd src/data_spider
pwd
scrapy crawl espn
