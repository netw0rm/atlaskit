#!/usr/bin/env bash
set -e

npm config set progress false
npm config set color always
npm config set loglevel warn

# Make sure chalk also colors when we are not in a TTY
export FORCE_COLOR="true"
