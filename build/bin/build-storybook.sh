#!/usr/bin/env bash
set -e

node --max_old_space_size=3000 ./node_modules/.bin/build-storybook -c ./build/storybook
