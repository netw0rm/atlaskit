#!/bin/sh

# This script is used to remove lerna linked modules that don't export javascript files
# When you `npm install` lerna bootstrap will run after wards and link any packages that it has
# the correct version for. The issue is that it links them by creating a package.json and an
# index.js that simply imports the module you want. It will not expose any other published files
# (shared less files, images, icons, lib folders, etc).
# At the moment, it only checks for ak-shared styles

# This will be run by lerna exec in each package after `npm link` has been called in
# ak-shared-styles (as a part of postinstall)

# check if package depends on ak-shared-styles. No need to check the actual file contents as we
# don't expose an index.js in the root directory of a component, always src/
if [ -f "node_modules/ak-shared-styles/index.js" ]; then
  COMP=`pwd | sed -E "s/.*\/(.*)/\1/"` #get the name of the current component from working dir
  rm -rf node_modules/ak-shared-styles
  npm link ak-shared-styles
  echo "$COMP has been npm linked"
fi
