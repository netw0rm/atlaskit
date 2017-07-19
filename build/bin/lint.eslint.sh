#!/usr/bin/env bash
set -e
export PATH="`yarn bin`:$PATH"
ROOT=$(git rev-parse --show-toplevel)
NODE_MODULES=$ROOT/node_modules

$NODE_MODULES/.bin/chalk --no-stdin -t "{blue ESLinting files…}"
$NODE_MODULES/.bin/eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js --ext .jsx $@
