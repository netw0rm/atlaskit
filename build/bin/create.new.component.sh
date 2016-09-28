#!/usr/bin/env bash
# Creates a new component under the packages directory using a template
# This is assumed to only be run from the `npm run create` command from the root directory

set -e

CHALK="`npm bin`/chalk"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    $CHALK white "Usage: npm run create component_name"
    exit 1
fi

COMP_NAME="$1"
PASCAL_CASE_NAME=$(./build/bin/pascal.case.js "$COMP_NAME" | sed "s/^Ak//")
CAMEL_CASE=$(./build/bin/camel.case.js "$COMP_NAME")

# TODO: Should we check the name to see if it looks namespaced? Hard code acceptable name spaces or
# base it on existing components?

# Check that a component of the same name doesn't exist
if [ -d "packages/$COMP_NAME" ]
  then
    $CHALK red "Error: a component with that name already exists"
    exit 1
fi

# Copy template files into packages directory
rm -rf packages/akutil-component-template/node_modules
cp -r "packages/akutil-component-template" "packages/$COMP_NAME"

# `find` is getting all the files under the new directory
# `xargs` is passing them to sed
# `sed` is replacing instances of 'akutil-component-template' and 'AkUtilComponentTemplate' with the new component name
# LC_CTYPE and LANG=C: http://stackoverflow.com/questions/19242275/re-error-illegal-byte-sequence-on-mac-os-x
LC_CTYPE=C && LANG=C && find "packages/$COMP_NAME/" -type f | xargs -I '{}' sed -i '' -e "s/akutil-component-template/${COMP_NAME}/g" -e "s/AkUtilComponentTemplate/${PASCAL_CASE_NAME}/g" -e "s/akUtilComponentTemplate/${CAMEL_CASE}/g" '{}'

pushd "packages/$COMP_NAME" > /dev/null

# Make sure our version for the new package is 1.0.0
sed -i '' 's/"version": "\([^"]*\)"/"version": "1.0.0"/' package.json

rm -f README.md
rm -f CHANGELOG.md

popd > /dev/null

# Install dependencies and link internal packages
npm install

npm run docs/single "$COMP_NAME"

$CHALK green "New component '$COMP_NAME' created (v1.0.0)"
$CHALK white bold "Hint: Please leave the version at 1.0.0+, as otherwise caret dependencies work differently"
