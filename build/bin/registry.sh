#!/usr/bin/env bash
set -e

# Clone the atlaskit-registry repo into the folder above atlaskit
echo "Cloning atlaskit-registry repo"
rm -rf ../atlaskit-registry
git clone --quiet "https://$BITBUCKET_USER:$BITBUCKET_PW_READONLY@bitbucket.org/atlassian/atlaskit-registry.git" ../atlaskit-registry
mkdir -p ../atlaskit-registry/_data ../atlaskit-registry/api ../atlaskit-registry/resources

# Install panop (converts monorepo to single YAML summary file)
# Note: unfortunately @atlassian scope is used on the public and private
# npm registries, which is why we need to disable the .npmrc file
# temporarily here.
echo "Installing panop from Atlassian private npm"
mv .npmrc ._npmrc
npm set loglevel warn
npm set @atlassian:registry https://npm-private-proxy.atlassian.io/
npm set //npm-private-proxy.atlassian.io/:_authToken $NPM_TOKEN_ATLASSIAN_PRIVATE
npm install --progress=false @atlassian/panop
mv ._npmrc .npmrc

# Generate momnorep summary which will feed into jekyll
echo "Generating summary files using panop"
BITBUCKET_PASS=$BITBUCKET_PW_READONLY `npm bin`/panop --repo=atlassian/atlaskit \
  --json=../atlaskit-registry/api/full.json

# Install atlaskit-registry dependencies
echo "Installing jekyll"
bundle install --quiet --gemfile=../atlaskit-registry/Gemfile

# Build website using jekyll
echo "Building site using Jekyll"
jekyll build --source ../atlaskit-registry --destination ../atlaskit-registry/resources

# Zip the built website so we can upload to CDN
rm -f ../ak-registry-cdn.zip
zip -0 -r -T ../ak-registry-cdn.zip ../atlaskit-registry/resources

# Authenticate with Atlassian Maven (only required for BB pipelines)
if [ -n "$MVN_USERNAME" ]
  then
    sed -i'back' "/<servers>/ a<server><id>atlassian-private</id><username>$MVN_USERNAME</username><password>$MVN_PASSWORD</password></server>" /usr/share/maven/conf/settings.xml
    sed -i'bak' '/<profiles>/ a<profile><id>atlassian-private</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-private</id><name>Atlassian Private</name><url>https://maven.atlassian.com/content/repositories/atlassian-private/</url><layout>default</layout></repository></repositories><pluginRepositories><pluginRepository><id>atlassian-private</id><url>https://maven.atlassian.com/content/groups/internal</url></pluginRepository></pluginRepositories></profile>' /usr/share/maven/conf/settings.xml
    sed -i'bak' '/<profiles>/ a<profile><id>atlassian-public</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-public</id><url>https://maven.atlassian.com/repository/public</url></repository></repositories></profile>' /usr/share/maven/conf/settings.xml
fi

# Install CDN upload tool from Maven
echo "Installing CDN tool"
mvn -B dependency:copy -Dartifact=com.atlassian.scripts.prebake.distributor:prebake-distributor-runner:0.22.0 -Dmdep.stripClassifier=true -Dmdep.stripVersion=true -Dsilent=true -DoutputDirectory=..

echo "Installing cloudfront-invalidate-cli"
npm install cloudfront-invalidate-cli@1.0.3 -g

# Upload to CDN
echo "Uploading registry to CDN..."
java -jar ../prebake-distributor-runner.jar \
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
cf-invalidate -- EVOK132JF0N16 '/atlaskit/registry/*'
echo "CDN invalidation (registry) finished."

echo "Building storybooks"
mkdir -p ../atlaskit-stories
npm run storybook/static/registry
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

echo "Uploading storybooks to CDN..."
java -jar ../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/stories" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=../ak-storybooks-cdn.zip

# Invalidate CDN caches
echo "CDN invalidation (storybooks) starting now (this may take some time)"

LERNA_LOC="`npm bin`/lerna"

TO_INVALIDATE=$($LERNA_LOC exec -- node -e \
'var pkg = require("./package.json"); console.log("/atlaskit/stories/" + pkg.name + "/" + pkg.version + "/*")'\
| sed 1,2d)

AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- EVOK132JF0N16 `echo $TO_INVALIDATE`
echo "CDN invalidation (storybooks) finished."
