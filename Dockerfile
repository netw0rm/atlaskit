FROM openjdk:8-jre-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#### <s3-uploader>
ADD ./prebake-distributor-runner.jar ..
#### </s3-uploader>

#### <general-tools>
RUN echo "Installing general tools" \
&& apk --update add \
  build-base \
  bash \
  git \
  openssh-client \
  curl \
  wget \
  ca-certificates \
  python \
  make \
&& rm -rf /var/cache/apk/*
#### </general-tools>

#### <ruby>
# Copied from https://github.com/andrius/alpine-ruby/blob/master/Dockerfile
# required until we switch atlaskit-registry from jekyll to metalsmith
RUN echo "Installing Ruby & bundler" \
&& apk --update add \
  ruby \
  ruby-dev \
  ruby-bundler \
&& apk del ruby-dev \
&& rm -rf /var/cache/apk/*

ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN bundle config build.nokogiri --use-system-libraries
#### </ruby>

#### <node>
# Copied from https://github.com/matriphe/docker-alpine-node/blob/master/Dockerfile
ENV TIMEZONE Australia/Sydney

ENV NODE_VERSION 6.2.0-r0
# TODO: We can't use 3.10.8 yet: https://github.com/npm/npm/issues/14042
ENV NPM_VERSION 3.10.7

RUN echo "Installing node & npm" \
  apk update && \
  apk upgrade && \
  apk add --update tzdata && \
  cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
  echo "${TIMEZONE}" > /etc/timezone && \
  apk add --update nodejs="${NODE_VERSION}" && \
  npm install -g npm@"${NPM_VERSION}" && \
  npm cache clean -f && \
  apk del tzdata && \
  rm -rf /var/cache/apk/*
#### </node>

#### <atlaskit-tools>
ADD ./lerna.json .
RUN echo "Installing atlaskit tools" \
&& LERNA_VERSION=$(node -e "console.log(require('./lerna.json').lerna)") \
&& echo "LERNA_VERSION is ${LERNA_VERSION}" \
&& npm install -g \
  cloudfront-invalidate-cli@1.0.3 \
  marky-markdown@8.1.0 \
  bitbucket-build-status@1.0.1 \
  npm-run-all@3.1.0 \
  lerna@"${LERNA_VERSION}" \
  lerna-semantic-release@8.0.2 \
&& npm cache clean -f
#### </atlaskit-tools>

ONBUILD COPY .npmrc /usr/src/app/
ONBUILD COPY npm-shrinkwrap.json /usr/src/app/
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

CMD [ "npm", "start" ]
