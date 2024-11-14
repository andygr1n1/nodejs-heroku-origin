# Kzen proxy

https://kzen.cloud/

# Production

https://srv642680.hstgr.cloud:444/

- build docker image and push to docker hub

```
docker login
docker build -t andygr1n1/nodejs-heroku-origin -f Dockerfile.production .
docker tag andygr1n1/nodejs-heroku-origin andygr1n1/nodejs-heroku-origin:latest
docker push andygr1n1/nodejs-heroku-origin:latest
```

- update docker image in docker-compose-prod.yaml on the server

```
docker compose -f docker-compose-prod.yaml up -d --build
```

# Development

- run docker compose or yarn watch
