#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
JSDOC2MD_LOC="`npm bin`/jsdoc2md"
CHALK="`npm bin`/chalk"
popd > /dev/null

PKG=$(node -e 'console.log(require("./package.json").name)')
VERSION=$(node -e 'console.log(require("./package.json").version)')
PREFIX="{white.bold [$PKG]}"

$CHALK --no-stdin -t "{blue $PREFIX Generating README.md...}"

# Get usage docs
if compgen -G "docs/USAGE\.md" > /dev/null; then
  USAGE=$(cat ./docs/USAGE.md | sed "s/@VERSION@/$VERSION/g")
else
  USAGE="# $PKG"
fi

# Generate API docs
if [[ -z `find ./src -name "*.js" -print || true` ]]; then
  API=""
  $CHALK --no-stdin -t "{blue $PREFIX Nothing found that can be documented.}"
else
  set +e
  DOCS="$($JSDOC2MD_LOC \
    --files "src/**/*.js" \
    --plugin akutil-dmd-plugin \
    --member-index-format list)"
  FAILED=$? # Order is important here, this needs to come right after the jsdoc2m sub command
  set -e

  if [ "$FAILED" -eq "1" ]; then
    # Remove this branch once jsdoc understands es6: https://github.com/jsdoc3/jsdoc/issues/1030
    $CHALK --no-stdin -t "{red $PREFIX ^ jsdoc2md died (Most likely due to unrecognized ES6 code, see error above).}"
  elif [[ $DOCS == *"ERROR, Cannot find class"* ]]; then
    $CHALK --no-stdin -t "{red $PREFIX Could not find a class.}"
  else
    API="$DOCS"
    $CHALK --no-stdin -t "{blue $PREFIX done!}"
  fi
fi

BUTTONS=$(cat ../../build/docs/templates/BUTTONS.md | sed "s/@VERSION@/$VERSION/g" | sed "s/@NAME@/$PKG/g")
SUPPORT=$(cat ../../build/docs/templates/SUPPORT.md | sed "s/@VERSION@/$VERSION/g" | sed "s/@NAME@/$PKG/g")
API=$(echo "$API" | sed "s/@BITBUCKET_COMMIT@/$BITBUCKET_COMMIT/g")

(
  echo "$BUTTONS"
  echo
  echo "$USAGE"
  echo
  echo "$SUPPORT"
  echo
  echo "$API"
  echo
) > README.md
