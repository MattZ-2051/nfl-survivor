# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM python:3.9-buster AS builder
WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend
