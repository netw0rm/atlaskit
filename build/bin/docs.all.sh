#!/bin/sh
set -e

PACKAGES=$(ls packages | grep "^ak-[-a-z]*$" | sed '/ak-animation/d') # Skip ak-animation package
for PKG in $PACKAGES; do
  npm run docs/single "$PKG"
done
