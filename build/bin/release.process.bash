#!/usr/bin/env bash
LSR="lerna-semantic-release"

$LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
