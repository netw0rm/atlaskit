#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
BIN_PATH=$(npm bin)
LERNA_LOC="$BIN_PATH/lerna"
CHALK="$BIN_PATH/chalk"
VALIDATE_LOC="$BIN_PATH/validate-commit-msg"

$CHALK --no-stdin -t "{blue Lerna bootstrap...}"
if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $LERNA_LOC bootstrap
else
  # piping to cat is used to put stdout in a non-TTY mode (hides the progress bar in lerna)
  $LERNA_LOC bootstrap | cat
fi

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $CHALK --no-stdin -t "{blue Installing hooks...}"
  node $BASEDIR/pre-commit.install.js
  $VALIDATE_LOC
fi
