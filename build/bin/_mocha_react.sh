#!/usr/bin/env bash
set -e

function mocha_react() {
  SUB_PATH="$1"
  # shift removes first arg (the package name)
  shift || true

  mocha \
  --compilers js:babel-core/register \
  --require ./build/enzyme/setup.js \
  "./packages/$SUB_PATH/test/**/*Spec.jsx" \
  $@
}
