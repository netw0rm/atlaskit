#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
JSDOC2MD_LOC="`npm bin`/jsdoc2md"
CHALK="`npm bin`/chalk"
popd > /dev/null

NAME=$(node -e 'console.log(require("./package.json").name)')
VERSION=$(node -e 'console.log(require("./package.json").version)')
PREFIX="{white.bold [$NAME]}"

$CHALK --no-stdin -t "{blue $PREFIX Generating README.md...}"

replacevars () {
    echo "$1" | \
    sed "s/@VERSION@/$VERSION/g" | \
    sed "s/@NAME@/$NAME/g" | \
    sed "s/@BITBUCKET_COMMIT@/$BITBUCKET_COMMIT/g"
}

# Get usage docs
if compgen -G "docs/USAGE\.md" > /dev/null; then
  USAGE=$(cat ./docs/USAGE.md)
  USAGE=$(replacevars "$USAGE")
else
  USAGE="# $NAME"
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
    API=$(replacevars "$DOCS")
    $CHALK --no-stdin -t "{blue $PREFIX done!}"
  fi
fi

BUTTONS=$(cat ../../build/docs/templates/BUTTONS.md)
BUTTONS=$(replacevars "$BUTTONS")
SUPPORT=$(cat ../../build/docs/templates/SUPPORT.md)
SUPPORT=$(replacevars "$SUPPORT")

(
  echo "$BUTTONS"
  echo
  echo "$USAGE"
  echo
  echo "$API"
  echo
  echo "$SUPPORT"
  echo
) > README.md
