# syntax=docker/dockerfile:1

FROM python:3.11-slim-buster

# Install system dependencies and clean up
RUN apt update && \
    apt install -y cmake g++ make ffmpeg libsm6 libxext6 wget && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /python-docker

# Copy only the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

ENV IN_DOCKER=true

CMD [ "python3", "-m" , "flask", "--app", "app", "run", "--host", "0.0.0.0" ]
