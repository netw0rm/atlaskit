#!/usr/bin/env bash
set -e

PKG="$1"
# shift removes first command line arg (the package name)
shift || true
PACKAGE="$PKG" yarn run storybook/static -- $@
