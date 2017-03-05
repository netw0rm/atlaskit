#!/usr/bin/env bash
set -e

PKG="$1"
# strip the "@atlaskit/" scope from the name because of an error in storybook
# TODO: Remove in AK-1586
SAFE_PKG=$(echo "$PKG" | sed -e "s/^@atlaskit\///")

NODE_ENV="development" PACKAGE="$SAFE_PKG" yarn run storybook
