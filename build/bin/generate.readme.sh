#!/usr/bin/env bash
set -e

printf "\033[34m"
echo "Generating README.md..."
printf "\033[0m"

# Get usage docs
if compgen -G "docs/USAGE\.md" > /dev/null; then
  USAGE="$(cat ./docs/USAGE.md)"
else
  USAGE=""
fi

# Generate API docs
API=""
if compgen -G "*/index\.js" > /dev/null; then

  API="$(../../node_modules/.bin/jsdoc2md \
    --plugin dmd-bitbucket ak-dmd-plugin \
    --src ./src/index.js \
    --member-index-format list \
    --name-format)"

  if [[ $API == *"ERROR, Cannot find class"* ]]
  then
    API=""
  else
    API="\n$API\n"
  fi

else
  API=""
fi

if [ -d ./src/children ]
then
  for file in $(find ./src/children -name "*.js"); do
    NEXT="$(../../node_modules/.bin/jsdoc2md \
      --plugin dmd-bitbucket ak-dmd-plugin \
      --src $file \
      --member-index-format list \
      --name-format)"

    if [[ $NEXT == *"ERROR, Cannot find class"* ]]
    then
      NEXT=""
    else
      NEXT="$NEXT\n"
    fi

    API="$API\n$NEXT"
  done
fi



# Concatenate USAGE docs and JSDoc output
if [ -n "$USAGE" ] || [ -n "$API" ]; then
  (
    printf "$USAGE"
    printf "$API"
  ) > README.md
fi
