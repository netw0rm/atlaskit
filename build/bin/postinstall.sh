#!/usr/bin/env bash
set -e

LERNA_LOC="`npm bin`/lerna"

if [ -z "$BITBUCKET_COMMIT" ]; then
  # we are in a local env

  BASEDIR=$(dirname $0)
  VALIDATE_COMMIT_MSG_LOC="`npm bin`/validate-commit-msg"
  printf "\033[34m"
  echo "Lerna bootstrap..."
  printf "\033[0m"
  $LERNA_LOC bootstrap

  printf "\033[34m"
  echo "Installing hooks..."
  printf "\033[0m"
  node $BASEDIR/pre-commit.install.js
  $VALIDATE_COMMIT_MSG_LOC
else
  # we are running in CI (do not link, as we can't guarantee that cross-dependencies still work)

  printf "\033[34m"
  echo "Installing packages..."
  printf "\033[0m"
  $LERNA_LOC exec -- npm install
fi
