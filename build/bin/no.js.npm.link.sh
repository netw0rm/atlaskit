#!/usr/bin/env sh
set -e
# This script is used to remove lerna linked modules that don't export javascript files
# When you `npm install` lerna bootstrap will run afterwards and link any packages that it has
# the correct version for. The issue is that it links them by creating a package.json and an
# index.js that simply imports the module you want. It will not expose any other published files
# (shared less files, images, icons, lib folders, etc).

# This will be run by lerna exec in each package after `npm link` has been called

# Find all packages without a `main` field – we assume these ones need to be npm linked
# as the don't have any js
NO_JS_PACKAGES=$(./node_modules/.bin/lerna exec -- node -e \
"!require('./package.json').main && console.log(require('process').cwd())"\
| awk NF \
| sed 1,2d)

# Get all packages so we now which ones to iterate through
ALL_PACKAGES=$(./node_modules/.bin/lerna exec pwd\
| awk NF \
| sed 1,2d)

# Set up the npm link for each of the packages with no js
echo ${NO_JS_PACKAGES} | xargs npm link 1>/dev/null

# Loop through all packages, and if they tried to depend on a no-js package, npm link it instead
for PKG in ${ALL_PACKAGES}; do
    pushd ${PKG} 1> /dev/null
    for NO_JS_PKG in ${NO_JS_PACKAGES}; do
        PKG_NAME=$(node -e "console.log(require('./package.json').name)")
        NO_JS_PKG_NAME=$(node -e "console.log(require('$NO_JS_PKG/package.json').name)")
        # If this package tried to depend on a no-js package
        if [ -f "node_modules/$NO_JS_PKG_NAME/index.js" ]; then
            npm link ${NO_JS_PKG_NAME} 1> /dev/null
            echo "$PKG_NAME -> $NO_JS_PKG_NAME npm linked"
        fi
    done
    popd 1> /dev/null
done

npm prune # For some reason npm link in sub folders also links the root's node_modules directory.
