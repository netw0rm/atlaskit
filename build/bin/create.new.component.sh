#!/bin/bash
# Creates a new component under the packages directory using a template
# This is assumed to only be run from the `npm run create` command from the root directory

set -e

# NAME_SPACE will be prepended to the component name
NAME_SPACE="ak"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    echo "Usage: npm run create component_name"
    exit 1
fi

COMP_NAME="$NAME_SPACE-$1"
# malformed names will give this script issues. May need to do some sanitizing later

# Check that a component of the same name doesn't exist
if [ -d "packages/$COMP_NAME" ]
  then
    echo "Error: a component with that name already exists"
    exit 1
fi

# Copy template files into packages directory
cp -r "packages/_new_component_template" "packages/$COMP_NAME"

# `find` is getting all the files under the new directory
# `xargs` is passing them to sed
# `sed` is replacing instances of '<COMPONENT_NAME>' with the new compnent name
find "packages/$COMP_NAME/" -type f | xargs -I '{}' sed -i '' "s/<COMPONENT_NAME>/$COMP_NAME/g" '{}'

echo "New component '$COMP_NAME' created (v0.0.0)"
echo "It is set to 'private' by default. Change this in the package.json when you are ready"
