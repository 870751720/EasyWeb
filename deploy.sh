#!/bin/bash
IMAGE_NAME=$1
DAEMON_JSON=$2

if ! command -v docker &> /dev/null; then
  sudo apt update
  sudo mkdir -p /etc/docker
  echo $DAEMON_JSON | sudo tee /etc/docker/daemon.json > /dev/null
  sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io
  sudo systemctl start docker
  sudo systemctl enable docker
fi

docker login ghcr.io -u $USER_NAME -p $DOCKER_TOKEN
docker pull ghcr.io/$USER_NAME/$IMAGE_NAME:latest

docker stop $IMAGE_NAME || true
docker rm $IMAGE_NAME || true
docker run -d --name $IMAGE_NAME -p 80:5000 ghcr.io/$USER_NAME/$IMAGE_NAME:latest
