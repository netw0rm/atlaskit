#!/usr/bin/env bash
set -e

# use yarn in stead of npm
ln -s /root/.yarn/bin/yarn /usr/bin/npm
# TODO remove this when fixed in yarn (was introduced in 0.16)
ln -s /root/.yarn/bin/yarn /usr/bin/yarn.js

yarn config set progress false
yarn config set color always
yarn config set loglevel warn
