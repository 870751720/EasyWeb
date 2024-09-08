#!/bin/bash
IMAGE_NAME=$1
DAEMON_JSON=$2
if ! command -v docker &> /dev/null; then
  sudo apt update
  sudo mkdir -p /etc/docker
  echo '$DAEMON_JSON' | sudo tee /etc/docker/daemon.json
  sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  sudo yum install -y docker-ce docker-ce-cli containerd.io
  sudo systemctl start docker
  sudo systemctl enable docker
fi
docker load -i /tmp/$IMAGE_NAME.tar.gz
docker stop $IMAGE_NAME || true
docker rm $IMAGE_NAME || true
docker run -d --name $IMAGE_NAME -p 80:5000 $IMAGE_NAME
