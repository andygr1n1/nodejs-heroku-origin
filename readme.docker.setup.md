# docker image build and push
docker login
docker build -t andygr1n1/nodejs-heroku-origin -f Dockerfile.production .
docker tag andygr1n1/nodejs-heroku-origin andygr1n1/nodejs-heroku-origin:latest
docker push andygr1n1/nodejs-heroku-origin:latest


