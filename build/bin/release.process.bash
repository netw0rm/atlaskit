#!/usr/bin/env bash
LSR="./node_modules/.bin/lerna-semantic-release"

# This is just disabled until monday when we regenerate all the changelogs
# node ./build/bin/changelogs && $LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
$LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
