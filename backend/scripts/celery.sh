#!/bin/sh

until
  cd src
do
  echo "run celery worker"
done
celery -A server worker --loglevel=INFO
