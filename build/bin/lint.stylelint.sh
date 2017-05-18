#!/usr/bin/env bash
set -e
export PATH="`yarn bin`:$PATH"
NODE_MODULES=`npm root`

chalk --no-stdin -t "{blue StyleLinting files…}"
stylelint "packages/**/*.{js,jsx}" $@
