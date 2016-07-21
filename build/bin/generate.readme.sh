#!/bin/sh
set -e

# Generate API docs
API="$(../../node_modules/.bin/jsdoc2md \
    --plugin dmd-bitbucket ak-dmd-plugin \
    --src ./src/index.js \
    --member-index-format list \
    --name-format)"

for file in $(find ./src/children -name "*.js"); do
  NEXT="$(../../node_modules/.bin/jsdoc2md \
    --plugin dmd-bitbucket ak-dmd-plugin \
    --src $file \
    --member-index-format list \
    --name-format)"
  API="$API\n$NEXT"
done

# Concatenate USAGE docs and JSDoc output
(
  cat ./docs/USAGE.md
  echo "$API"
) > README.md
