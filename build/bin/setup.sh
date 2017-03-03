#!/usr/bin/env bash
set -e

npm=$(which npm)
alias npm='node --max_old_space_size=8192 $npm'

yarn=$(which yarn)
alias yarn='node --max_old_space_size=8192 $yarn'

yarn config set progress false
yarn config set color always
yarn config set loglevel warn
