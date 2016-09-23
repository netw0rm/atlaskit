#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
TIMESTAMP=$(date +%Y%m%d%H%M%S)
GITHEAD_SHORT=$(git rev-parse --short HEAD)

BROWSERSTACK_TUNNEL="$TIMESTAMP-$GITHEAD_SHORT" node $BASEDIR/test.browserstack.ci.js
