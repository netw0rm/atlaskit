#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
LERNA_LOC="`npm bin`/lerna"

printf "\033[34m"
echo "Lerna bootstrap..."
printf "\033[0m"
if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $LERNA_LOC bootstrap
else
  # piping to cat is used to put stdout in a non-TTY mode (hides the progress bar in lerna)
  $LERNA_LOC bootstrap | cat
fi

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  printf "\033[34m"
  echo "Installing hooks..."
  printf "\033[0m"
  node $BASEDIR/pre-commit.install.js
  validate-commit-msg
fi
