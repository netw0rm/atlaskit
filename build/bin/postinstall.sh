#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
LERNA_LOC="`npm bin`/lerna"
CHALK="`npm bin`/chalk"

$CHALK --no-stdin -t "{blue Lerna bootstrap...}"
if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $LERNA_LOC bootstrap
else
  # piping to cat is used to put stdout in a non-TTY mode (hides the progress bar in lerna)
  $LERNA_LOC bootstrap | cat
fi

$CHALK --no-stdin -t "{blue Installing hooks...}"
node $BASEDIR/pre-commit.install.js
validate-commit-msg
