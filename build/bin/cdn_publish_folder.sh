#!/usr/bin/env bash
set -e

# TODO: Rewrite this as a js script to be consistent with the rest of the build.
# Currently you can call it from a the wrapping script in build/bin/cdn/uploadDirectory.js

SOURCE_FOLDER="$1"
TARGET_PATH="$2"
CHALK="`yarn bin`/chalk"

$CHALK --no-stdin -t "{blue Publishing folder '$SOURCE_FOLDER' to '$CDN_URL_SCOPE/$TARGET_PATH'}"

TEMP_DIR=$(mktemp -d)
TEMP_ZIP="$TEMP_DIR/bundle.zip"
mv "$SOURCE_FOLDER" "$TEMP_DIR/resources"
zip -0 -r -T "$TEMP_ZIP" "$TEMP_DIR/resources"

$CHALK --no-stdin -t "{blue Uploading '$SOURCE_FOLDER' to CDN...}"

prebake-distributor-runner \
  --s3-bucket="$S3_BUCKET" \
  --s3-key-prefix="$S3_KEY_PREFIX/$TARGET_PATH" \
  --s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$TARGET_PATH" \
  "$TEMP_ZIP"

$CHALK --no-stdin -t "{blue Upload of '$SOURCE_FOLDER' to CDN complete.}"
$CHALK --no-stdin -t "{blue See here: '$CDN_URL_BASE/$CDN_URL_SCOPE/$TARGET_PATH'}"

