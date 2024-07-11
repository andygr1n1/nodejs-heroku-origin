# Use a specific Node.js version
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /nodejs_heroku_origin

# Copy package files
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN apk --no-cache add bash \
    && npm install -g yarn@1.22.22 --force \
    && yarn install

# Copy the rest of your application code
COPY . .

# Run your application
CMD ["yarn", "watch"]