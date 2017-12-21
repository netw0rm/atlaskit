#!/usr/bin/env bash
set -e


function cdn_publish_folder() {
  local SOURCE_FOLDER="$1"
  local TARGET_PATH="$2"
  local CHALK="`yarn bin`/chalk"
  local S3CLI="`yarn bin`/s3-cli"

  $CHALK --no-stdin -t "{blue Publishing folder '$SOURCE_FOLDER' to '$NEW_S3_BUCKET/$TARGET_PATH'}"

  $CHALK --no-stdin -t "{blue Uploading '$SOURCE_FOLDER' to CDN...}"

  AWS_ACCESS_KEY=$NEW_AWS_ACCESS_KEY AWS_SECRET_KEY=$NEW_AWS_SECRET_KEY $S3CLI sync --region="ap-southeast-2" $SOURCE_FOLDER s3://atlaskit-storybooks/$TARGET_PATH

  echo "URL IS PROBABLY $NEW_CDN_URL_BASE/$TARGET_PATH/index.html"

  $CHALK --no-stdin -t "{blue Upload of '$SOURCE_FOLDER' to CDN complete.}"
}

