#!/usr/bin/env bash
set -e

PKG="$1"
# shift removes first command line arg (the package name)
shift || true
NODE_ENV="development" PACKAGE="$PKG" npm run storybook
