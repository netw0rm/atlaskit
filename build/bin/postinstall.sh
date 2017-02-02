#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
BIN_PATH=$(yarn bin)
LERNA_LOC="$BIN_PATH/lerna"
CHALK="$BIN_PATH/chalk"
VALIDATE_LOC="$BIN_PATH/validate-commit-msg"

# check if we are running in CI (BITBUCKET_COMMIT will exist in CI)
if [[ -z "$BITBUCKET_COMMIT" ]]; then
  # check if --skip-bootstrap flag is passed
  if [[ "$1" != "--skip-bootstrap" ]]
    then
      $CHALK --no-stdin -t "{blue Lerna bootstrap...}"
      $LERNA_LOC bootstrap
  fi
else
  # piping to cat is used to put stdout in a non-TTY mode (hides the progress bar in CI)
  $LERNA_LOC bootstrap | cat
fi

$CHALK --no-stdin -t "{blue Linking local eslint-configs...}"
node $BASEDIR/link.eslint.configs.js

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $CHALK --no-stdin -t "{blue Installing hooks...}"
  node $BASEDIR/pre-commit.install.js
  $VALIDATE_LOC
fi
