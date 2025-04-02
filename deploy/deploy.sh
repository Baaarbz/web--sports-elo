#!/bin/bash

if ! docker network inspect sports-elo-network &>/dev/null; then
  echo "Creating network sports-elo-network..."
  docker network create sports-elo-network
fi

docker pull docker.io/baaarbz/web-sports-elo:latest

docker stop web-sports-elo &>/dev/null || true
docker rm web-sports-elo &>/dev/null || true

docker run -d --restart=always -p 3000:3000 --name web-sports-elo \
  --network sports-elo-network \
  -e API_URL=${API_URL} \
  baaarbz/web-sports-elo:latest

docker images --filter "dangling=true" -q | xargs -r docker rmi