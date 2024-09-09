#!/bin/bash
IMAGE_NAME=$1

if ! command -v docker &> /dev/null; then
  sudo yum remove -y docker-ce docker-ce-cli containerd.io
  sudo rm -rf /var/lib/docker
  sudo rm -rf /var/run/docker
  sudo rm /etc/yum.repos.d/docker-ce.repo
  sudo yum install -y yum-utils
  sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  sudo yum install -y docker-ce docker-ce-cli containerd.io
  sudo systemctl start docker
  sudo systemctl enable docker
fi

cd /tmp/app

docker build -t $IMAGE_NAME .

docker stop $IMAGE_NAME || true
docker rm $IMAGE_NAME || true

docker run -d --name $IMAGE_NAME -p 80:5000 $IMAGE_NAME
