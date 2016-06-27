#!/bin/sh
set -e

BASEDIR=$(dirname $0)
shift || true

while read line; do
  PACKAGE=$(echo $line | cut -d@ -f1)

  npm run jsdoc/build/single $PACKAGE

  # and then release what is in packages/$PACKAGE/docs/out
done
