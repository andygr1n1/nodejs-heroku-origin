# Use a specific Node.js version
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for sharp
RUN apk --no-cache add \
    bash \
    vips-dev \
    python3 \
    make \
    g++

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies with platform-specific sharp
RUN npm install -g yarn@1.22.22 --force \
    && yarn install --frozen-lockfile \
    && yarn add sharp --platform=linuxmusl --arch=x64

# Copy the built application
COPY ./build ./build

EXPOSE 8008

# Run your application
CMD ["node", "build/index.mjs"]
