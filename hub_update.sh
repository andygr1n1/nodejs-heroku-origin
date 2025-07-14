#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="andygr1n1/kz-node"
TAG_LATEST="latest"
TAG_LINUX="linux"

echo -e "${YELLOW}🚀 Starting Docker build and push process for multiple tags...${NC}"

# Function to handle errors
handle_error() {
    echo -e "${RED}❌ Error occurred during execution${NC}"
    exit 1
}

# Set error handling
set -e
trap handle_error ERR

# Build the Docker image for latest tag (default platform)
echo -e "${YELLOW}📦 Building Docker image: ${IMAGE_NAME}:${TAG_LATEST}${NC}"
docker build . -t ${IMAGE_NAME}:${TAG_LATEST}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully for latest tag!${NC}"
else
    echo -e "${RED}❌ Docker build failed for latest tag${NC}"
    exit 1
fi

# Build the Docker image for linux tag (linux/amd64 platform)
echo -e "${YELLOW}📦 Building Docker image: ${IMAGE_NAME}:${TAG_LINUX} (linux/amd64)${NC}"
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME}:${TAG_LINUX} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully for linux tag!${NC}"
else
    echo -e "${RED}❌ Docker build failed for linux tag${NC}"
    exit 1
fi

# Push both Docker images
echo -e "${YELLOW}📤 Pushing Docker images to registry...${NC}"

# Push latest tag
docker push ${IMAGE_NAME}:${TAG_LATEST}
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image ${TAG_LATEST} pushed successfully!${NC}"
else
    echo -e "${RED}❌ Docker push failed for ${TAG_LATEST}${NC}"
    exit 1
fi

# Push linux tag
docker push ${IMAGE_NAME}:${TAG_LINUX}
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image ${TAG_LINUX} pushed successfully!${NC}"
else
    echo -e "${RED}❌ Docker push failed for ${TAG_LINUX}${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Build and push completed successfully!${NC}"
echo -e "${GREEN}📋 Images: ${IMAGE_NAME}:${TAG_LATEST} and ${IMAGE_NAME}:${TAG_LINUX}${NC}" 