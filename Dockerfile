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

# Copy package files first for better layer caching
COPY package.json yarn.lock ./

# Install dependencies (including sharp for linuxmusl for Alpine)
RUN npm install -g yarn@1.22.22 --force \
    && yarn install --frozen-lockfile \
    && yarn add sharp --platform=linuxmusl --arch=x64

# Copy application source (build runs in Docker; no pre-built ./build needed)
COPY . .

# Build the app (Dokploy/GitHub sync clones repo without build folder)
RUN yarn build

EXPOSE 8008

# Run the application
CMD ["node", "build/index.mjs"]
