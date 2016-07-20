#!/bin/sh
set -e

# Generate API docs
API="$(../../node_modules/.bin/jsdoc2md \
--plugin dmd-bitbucket ak-dmd-plugin \
--src ./src/index.js \
--member-index-format list \
--name-format)"

# Concatenate USAGE docs and JSDoc output
(
  cat ./docs/USAGE.md
  echo "$API"
) > README.md
