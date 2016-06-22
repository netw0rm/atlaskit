#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
PACKAGE="$PKG" start-storybook -p 9001
