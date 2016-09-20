#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
JSDOC2MD_LOC="`npm bin`/jsdoc2md"
popd > /dev/null

printf "\033[34m"
printf "Generating README.md..."
printf "\033[0m"

# Get usage docs
if compgen -G "docs/USAGE\.md" > /dev/null; then
  VERSION=$(node -e 'console.log(require("./package.json").version)')
  USAGE=$(cat ./docs/USAGE.md | sed "s/@VERSION@/$VERSION/g")
  USAGE="$USAGE\n"
else
  USAGE=""
fi

# Generate API docs
if [[ -z `find ./src -name "index*.js" -print -quit` ]]; then
  API=""
  printf "\033[34m"
  echo " Nothing found that can be documented."
  printf "\033[0m"
else
  DOCS="$($JSDOC2MD_LOC \
    --src "src/**/index*.js" \
    --plugin akutil-dmd-plugin \
    --src $file \
    --member-index-format list \
    --name-format)"

  if [[ $DOCS == *"ERROR, Cannot find class"* ]]; then
    printf "\033[34m"
    echo " Could not find a class."
    printf "\033[0m"
  else
    API="\n$DOCS"
    printf "\033[34m"
    echo " done!"
    printf "\033[0m"
  fi
fi

# Concatenate USAGE docs and JSDoc output
if [ -n "$USAGE" ] || [ -n "$API" ]; then
  (
    printf "$USAGE"
    printf "$API"
  ) > README.md
fi
