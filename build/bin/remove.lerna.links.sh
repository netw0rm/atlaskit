#!/bin/sh

# This script is used to remove lerna linked modules that don't export javascript files
# When you `npm install` lerna bootstrap will run after wards and link any packages that it has
# the correct version for. The issue is that it links them by creating a package.json and an
# index.js that simply imports the module you want. It will not expose any other published files
# (shared less files, images, icons, lib folders, etc).
