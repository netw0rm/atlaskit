#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh

function registry_build_status() {
  build_status \
    "REGISTRY" \
    "Registry" \
    "The component registry" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/registry/"
}

registry_build_status "INPROGRESS"

# Note: unfortunately @atlassian scope is used on the public and private
# npm registries, which is why we need to disable the .npmrc file
# temporarily here.
$CHALK --no-stdin -t "{blue Installing atlaskit-registry from Atlassian private npm}"
mv .npmrc ._npmrc
npm config set progress false
npm set loglevel warn
npm set @atlassian:registry https://npm-private-proxy.atlassian.io/
npm set //npm-private-proxy.atlassian.io/:_authToken $NPM_TOKEN_ATLASSIAN_PRIVATE
npm install @atlassian/atlaskit-registry@^1.3.1
mv ._npmrc .npmrc

# Build website using jekyll
$CHALK --no-stdin -t "{blue Building registry}"
TARGET_PATH_RELATIVE=../atlaskit-registry/resources
mkdir -p $TARGET_PATH_RELATIVE
pushd $TARGET_PATH_RELATIVE > /dev/null
TARGET_PATH=`pwd`
popd > /dev/null
REGISTRY_BIN=`npm bin`/ak-registry
REGISTRY_PATH=`npm root`/@atlassian/atlaskit-registry
pushd $REGISTRY_PATH > /dev/null
BITBUCKET_PASS=$BITBUCKET_PW_READONLY $REGISTRY_BIN --destination $TARGET_PATH
popd > /dev/null

# Zip the built website so we can upload to CDN
rm -f ../ak-registry-cdn.zip
zip -0 -r -T ../ak-registry-cdn.zip ../atlaskit-registry/resources

# Upload to CDN
$CHALK --no-stdin -t "{blue Uploading registry to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/registry" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/registry" \
"../ak-registry-cdn.zip"

# Invalidate CDN cache
cf_invalidate "/atlaskit/registry/*"

registry_build_status "SUCCESSFUL"
