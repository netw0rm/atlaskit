#!/bin/sh
set -e

node ./node_modules/lerna/bin/lerna.js exec --concurrency 1 -- touch CHANGELOG.md
node ./node_modules/lerna/bin/lerna.js exec --concurrency 1 -- git add CHANGELOG.md
git commit -anm\'docs(changelog): appending to changelog\' --allow-empty
git push origin
