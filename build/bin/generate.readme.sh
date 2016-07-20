#!/bin/bash
set -e

printf "\033[34m"
echo "Generating README.md..."
printf "\033[0m"

# Generate API docs
API="$(../../node_modules/.bin/jsdoc2md \
--plugin dmd-bitbucket ak-dmd-plugin \
--src ./src/index.js \
--member-index-format list \
--name-format)"

if [[ $API == *"ERROR, Cannot find class"* ]]
then
  API=""
else
  API="\n$API"
fi

# Concatenate USAGE docs and JSDoc output
(
  cat ./docs/USAGE.md
  printf "$API"
) > README.md
