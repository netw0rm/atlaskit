#!/usr/bin/env bash
set -e

# use yarn in stead of npm
ln -s /root/.yarn/bin/yarn /usr/bin/npm

yarn config set progress false
yarn config set color always
yarn config set loglevel warn
