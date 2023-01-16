# syntax=docker/dockerfile:1.4

FROM --platform=linux/amd64 python:3.9-buster AS builder
WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install django-celery-beat
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend
