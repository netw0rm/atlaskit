#!/usr/bin/env bash
set -e

LERNA_LOC="`yarn bin`/lerna"
CHALK="`yarn bin`/chalk"
VALIDATE_COMMIT_MSG_LOC="`yarn bin`/validate-commit-msg"
BASEDIR=$(dirname $0)

$CHALK --no-stdin -t "{blue Installing packages...}"
$LERNA_LOC exec --concurrency=1 -- ../../build/bin/postinstall.single.sh

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  # we are in a local env
  $CHALK --no-stdin -t "{blue Installing hooks...}"
  node $BASEDIR/pre-commit.install.js

  $CHALK --no-stdin -t "{blue Installing commit message validator...}"
  $VALIDATE_COMMIT_MSG_LOC
fi
