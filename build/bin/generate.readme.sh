#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
JSDOC2MD_LOC="`npm bin`/jsdoc2md"
CHALK="`npm bin`/chalk"
popd > /dev/null

$CHALK --no-stdin -t "{blue Generating README.md...}"

# Get usage docs
if compgen -G "docs/USAGE\.md" > /dev/null; then
  VERSION=$(node -e 'console.log(require("./package.json").version)')
  USAGE=$(cat ./docs/USAGE.md | sed "s/@VERSION@/$VERSION/g")
  USAGE="$USAGE\n"
else
  USAGE=""
fi

# Generate API docs
if [[ -z `find ./src -name "*.js" -print -quit` ]]; then
  API=""
  $CHALK --no-stdin -t "{blue  Nothing found that can be documented.}"
else
  set +e
  DOCS="$($JSDOC2MD_LOC \
    --verbose \
    --src "src/**/*.js" \
    --plugin akutil-dmd-plugin \
    --member-index-format list \
    --name-format)"
  FAILED=$? # Order is important here, this needs to come right after the jsdoc2m sub command
  set -e

  if [ "$FAILED" -eq "1" ]; then
    # Remove this branch once jsdoc understands es6: https://github.com/jsdoc3/jsdoc/issues/1030
    $CHALK --no-stdin -t "{red ^ jsdoc2md died (Most likely due to unrecognized ES6 code, see error above).}"
  elif [[ $DOCS == *"ERROR, Cannot find class"* ]]; then
    $CHALK --no-stdin -t "{red  Could not find a class.}"
  else
    API="\n$DOCS"
    $CHALK --no-stdin -t "{blue  done!}"
  fi
fi

# Concatenate USAGE docs and JSDoc output
if [ -n "$USAGE" ] || [ -n "$API" ]; then
  (
    printf "$USAGE"
    printf "$API"
  ) > README.md
fi
