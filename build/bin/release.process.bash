#!/usr/bin/env bash
LSR="lerna-semantic-release"

$LSR pre && yarn run docs && $LSR post && $LSR perform
