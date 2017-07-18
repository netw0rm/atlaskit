#!/usr/bin/env bash
set -e

ROOT=$(git rev-parse --show-toplevel)

if [ ! -z $1 ]
then
  PKG="$1"
else
  PKG=$($ROOT/build/bin/_maybe-package-name.js)
fi

# strip the "@atlaskit/" scope from the name because of an error in storybook
# TODO: Remove in AK-1586
SAFE_PKG=$(echo "$PKG" | sed -e "s/^@atlaskit\///")

NODE_ENV="development" PACKAGE="$SAFE_PKG" $ROOT/node_modules/.bin/start-storybook --dont-track -p 9001 -c $ROOT/build/storybook
