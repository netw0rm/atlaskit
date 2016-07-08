FROM atlassianlabs/docker-node-jdk-chrome-firefox:latest

# required until we switch atlaskit-registry from jekyll to metalsmith
RUN set -x \
    && apt-get update \
    && apt-get install -y \
        ruby-full \
        ruby-dev \
        build-essential
RUN gem install bundler

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY .npmrc /usr/src/app/
ONBUILD COPY npm-shrinkwrap.json /usr/src/app/
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

CMD [ "npm", "start" ]
