# Use a specific Node.js version
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY ./build ./build

# Install dependencies
RUN apk --no-cache add bash \
    && npm install -g yarn@1.22.22 --force \
    && yarn install

EXPOSE 8008

# Run your application
CMD ["node", "build/index.mjs"]
