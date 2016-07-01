#!/bin/sh
set -e

PACKAGES=$(ls packages | grep "^ak-[-a-z]*$")
for PKG in $PACKAGES; do
  npm run docs/single "$PKG"
done
