#!/bin/sh
set -e

BASEDIR=$(dirname $0)
TIMESTAMP=$(date +%Y%m%d%H%M%S)
HEAD_SHA=$(git rev-parse HEAD | cut -c1-6)

BROWSERSTACK_TUNNEL="$TIMESTAMP-$HEAD_SHA" node $BASEDIR/test.browserstack.ci.fast.js
