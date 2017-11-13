#!/usr/bin/env bash
set -e

# We don't wan the old version of yarn from Docker image
npm uninstall -g yarn

# Notes:
# - Reinstalling globally won't work because of cross-FS linking issue.
# - Installing locally (in ./node_modules) won't work for scripts, that call "yarn" from path (node_modules is not in $PATH)
# - Linking a local node_modules/.bin/yarn to /usr/local/bin doesn't work, because node and yarn gets confused with path resolution (it crashes at install)
# - Installing through APK doesn't work because there's some Alpine repository config problem (package not found)
#
# TODO: We should upgrade Yarn in the Docker image or remove it from there, and install through build script every time.

# Install through the bash script (which is the second recommended method after using APK)
# EDIT: We pin the version because yarn 1.0.0's bin command seems to return the global bin, not the local one.
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.28.4
export PATH=$HOME/.yarn/bin:$PATH

yarn config set progress false
yarn config set color always
yarn config set loglevel warn
