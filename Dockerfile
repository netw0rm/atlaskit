FROM openjdk:8-jre-alpine

ARG LERNA_VERSION

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
  zip \
  unzip \
  tar \
  gzip \
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
RUN echo "Installing AtlasKit tools" \
&& npm install -g \
  cloudfront-invalidate-cli@1.0.3 \
  marky-markdown@8.1.0 \
  bitbucket-build-status@1.0.1 \
  npm-run-all@3.1.0 \
  lerna@"${LERNA_VERSION}" \
  lerna-semantic-release@8.0.2 \
  indexifier@2.0.0 \
  @atlassian/prebake-distributor-runner@1.0.0 \
&& npm cache clean -f
#### </atlaskit-tools>

#### <ssh-keys>
ENV HOSTS_FILE="/root/.ssh/known_hosts"
ENV BB_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAubiN81eDcafrgMeLzaFPsw2kNvEcqTKl/VqLat/MaB33pZy0y3rJZtnqwR2qOOvbwKZYKiEO1O6VqNEBxKvJJelCq0dTXWT5pbO2gDXC6h6QDXCaHo6pOHGPUy+YBaGQRGuSusMEASYiWunYN0vCAI8QaXnWMXNMdFP3jHAJH0eDsoiGnLPBlBp4TNm6rYI74nMzgz3B9IikW4WVK+dc8KZJZWYjAuORU3jc1c/NPskD2ASinf8v3xnfXeukU0sJ5N6m5E8VLjObPEO+mN2t/FZTMZLiFqPWc/ALSqnMnnhwrNi2rbfg/rd/IpL8Le3pSBne8+seeFVBoGqzHM9yXw=="
ENV GH_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ=="

RUN echo "Setting up SSH keys" \
&& mkdir -p /root/.ssh/ \
&& touch /root/.ssh/known_hosts \
&& echo "bitbucket.org ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.1 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.2 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.3 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "github.com ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.131 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.253.112 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.129 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.128 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,131.103.20.168 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.130 ssh-rsa $GH_KEY" >> $HOSTS_FILE
#### </ssh-keys>

ONBUILD COPY .npmrc /usr/src/app/
ONBUILD COPY npm-shrinkwrap.json /usr/src/app/
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

CMD [ "npm", "start" ]
