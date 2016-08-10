#!/bin/bash
set -e

lerna="`npm bin`/lerna"
$lerna exec --concurrency 1 -- touch CHANGELOG.md
$lerna exec --concurrency 1 -- git add CHANGELOG.md
git commit -anm"docs(changelog): appending to changelog" --allow-empty
git pull origin --no-edit
git push origin
