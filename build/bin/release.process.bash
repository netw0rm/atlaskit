#!/usr/bin/env bash
LSR="./node_modules/.bin/lerna-semantic-release"

# We have removed the changelog generation until it is more stress tested
# node ./build/bin/changelogs/markAllRelevantAsReleased.js && $LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
$LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
