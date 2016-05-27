FROM joscha/node-chrome-firefox:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY .npmrc /usr/src/app/
ONBUILD COPY npm-shrinkwrap.json /usr/src/app/
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

CMD [ "npm", "start" ]
