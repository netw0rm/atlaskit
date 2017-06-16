#!/usr/bin/env bash
set -e

export NODE_ENV="test"
node ./build/jest/index.js $@
