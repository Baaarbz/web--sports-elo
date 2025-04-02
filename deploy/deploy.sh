#!/bin/bash

if ! docker network inspect sports-elo-network &>/dev/null; then
  echo "Creating network sports-elo-network..."
  docker network create sports-elo-network
fi

docker pull docker.io/baaarbz/web-sports-elo:latest

docker run -d --restart=always --replace -p 3000:3000 --name web-sports-elo \
  --network sports-elo-network \
  baaarbz/web-sports-elo:latest

docker images --filter "dangling=true" -q | xargs -r docker rmi