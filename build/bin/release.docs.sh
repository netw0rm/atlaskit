#!/bin/sh
set -e

BASEDIR=$(dirname $0)
shift || true

while read line; do
  PACKAGE=$(echo $line | cut -d@ -f1)

  echo "[Release docs]: Building docs for $PACKAGE"

  npm run jsdoc/build/single "$PACKAGE"

  echo "[Release docs]: Releasing docs for $PACKAGE"

  # and then release what is in packages/$PACKAGE/docs/out
done
