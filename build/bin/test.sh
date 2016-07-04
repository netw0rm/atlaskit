#!/bin/sh
set -e

node ./node_modules/lerna/bin/lerna.js exec -- ../../build/bin/test.karma.nofail.sh
