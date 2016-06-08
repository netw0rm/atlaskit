#!/bin/sh
set -e
set -o pipefail

lerna exec --concurrency 1 -- touch CHANGELOG.md
lerna exec --concurrency 1 -- git add CHANGELOG.md
git commit -anm\'docs(changelog): appending to changelog\' --allow-empty
git push origin
