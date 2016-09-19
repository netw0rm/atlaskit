#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)

# Note: unfortunately @atlassian scope is used on the public and private
# npm registries, which is why we need to disable the .npmrc file
# temporarily here.
echo "Installing atlaskit-registry from Atlassian private npm"
mv .npmrc ._npmrc
npm config set progress false
npm set loglevel warn
npm set @atlassian:registry https://npm-private-proxy.atlassian.io/
npm set //npm-private-proxy.atlassian.io/:_authToken $NPM_TOKEN_ATLASSIAN_PRIVATE
npm install @atlassian/atlaskit-registry@^1.3.1
mv ._npmrc .npmrc

# Build website using jekyll
echo "Building registry"
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

$BASEDIR/_install_cdn_tools.sh

# Upload to CDN
echo "Uploading registry to CDN..."
java \
-jar \
-Dlog4j.configurationFile=build/bin/logger.xml \
../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX/registry" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/registry" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=../ak-registry-cdn.zip

# Invalidate CDN caches
echo "CDN invalidation (registry) starting now (this may take some time)"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION '/atlaskit/registry/*'
echo "CDN invalidation (registry) finished."

echo "Building storybooks"
mkdir -p ../atlaskit-stories
npm run storybook/static/registry
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

echo "Uploading storybooks to CDN..."
java \
-jar \
-Dlog4j.configurationFile=build/bin/logger.xml \
../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/stories" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=../ak-storybooks-cdn.zip

# Invalidate CDN caches
echo "CDN invalidation (storybooks) starting now (this may take some time)"

AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION '/atlaskit/stories/*'
echo "CDN invalidation (storybooks) finished."
