#!/bin/bash

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

if ! command -v docker-compose &> /dev/null; then
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

cd /tmp/project
docker-compose down
docker-compose up -d --build
