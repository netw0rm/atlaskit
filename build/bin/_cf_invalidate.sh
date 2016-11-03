#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"

function url_exists() {
  set +e
  curl --silent --fail --head "$CDN_URL_BASE/$1" 1> /dev/null
  local RETVAL=$?
  if [[ "$RETVAL" -gt "0" ]]; then
    # URL does not exist (e.g. returned a status code >= 400)
    echo 0
  else
    # URL exists (e.g. returned a status code < 400)
    echo 1
  fi
  set -e
}

function cf_invalidate() {
  local CLOUDFRONT_INVALIDATION_PATTERN="$1"

  $CHALK --no-stdin -t "{blue Invalidating CloudFront cache for distribution '$CLOUDFRONT_DISTRIBUTION' and pattern '$CLOUDFRONT_INVALIDATION_PATTERN'}"

  AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
  AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
  cf-invalidate \
  -- \
  $CLOUDFRONT_DISTRIBUTION \
  "$CLOUDFRONT_INVALIDATION_PATTERN"

  $CHALK --no-stdin -t "{blue Invalidation successful!}"
}
