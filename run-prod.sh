#!/bin/bash

# Define variables
IMAGE_NAME="andygr1n1/nodejs-heroku-origin"
CONTAINER_NAME="nodejs-heroku-origin-container"
DOCKERFILE="Dockerfile.production"
PORT=8008

docker pull $IMAGE_NAME

# Stop and remove any existing container with the same name
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Run the Docker container
docker run -d --name $CONTAINER_NAME -p $PORT:$PORT --env-file .env $IMAGE_NAME