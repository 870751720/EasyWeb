# syntax=docker/dockerfile:1

FROM python:3.11-slim-buster

RUN apt update && apt install -y cmake g++ make ffmpeg libsm6 libxext6 wget

WORKDIR /web-docker

ENV PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/

COPY ./easy_server/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./easy_server .

COPY ./easy_react/build ./statics

ENV IN_DOCKER=true

CMD [ "python3", "-m" , "flask", "--app", "app", "run", "--host", "0.0.0.0"]
