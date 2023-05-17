FROM alpine

WORKDIR /nodejs_heroku_origin

COPY package.json .

COPY yarn.lock .

COPY . .

RUN  apk --no-cache add --update bash \
	&& apk add yarn \
	&& apk add npm \
	&& yarn install \
	&& apk update

CMD yarn nodemon