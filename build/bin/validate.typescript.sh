#!/usr/bin/env bash
set -e
export PATH="`yarn bin`:$PATH"
ROOT=$(dirname $0)/../..

# A catch-all check that applies to all .d.ts files. This avoids the need to place tsconfig.json
# configuration files in packages that *don't* want to be TypeScript, but *do* want to publish
# TypeScript declarations.
chalk --no-stdin -t "{blue Validating {.underline JavaScript} .d.ts declarations…}"
tsc -p $ROOT/build/types/tsconfig.validate.json --noEmit

# Validate TypeScript packages (those that contain a tsconfig.json).
chalk --no-stdin -t "{blue Validating {.underline TypeScript} packages…}"
lerna exec --loglevel warn -- ../../build/bin/validate.typescript.each.sh
