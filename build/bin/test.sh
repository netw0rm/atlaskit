#!/bin/sh
set -e

lerna exec -- ../../build/bin/test.karma.nofail.sh
