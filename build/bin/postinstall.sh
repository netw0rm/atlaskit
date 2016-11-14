#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
BIN_PATH=$(yarn bin)
LERNA_LOC="$BIN_PATH/lerna"
CHALK="$BIN_PATH/chalk"
VALIDATE_LOC="$BIN_PATH/validate-commit-msg"

$CHALK --no-stdin -t "{blue Installing packages...}"
$LERNA_LOC exec --concurrency=1 -- ../../build/bin/postinstall.single.sh

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  # we are in a local env
  $CHALK --no-stdin -t "{blue Installing hooks...}"
  node $BASEDIR/pre-commit.install.js

  $CHALK --no-stdin -t "{blue Installing commit message validator...}"
  $VALIDATE_LOC
fi
