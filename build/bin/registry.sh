#!/bin/sh
set -e

# Clone the atlaskit-registry repo into the folder above atlaskit
echo "Cloning atlaskit-registry repo"
rm -rf ../atlaskit-registry
git clone --quiet "https://$BITBUCKET_USER:$BITBUCKET_PW_READONLY@bitbucket.org/atlassian/atlaskit-registry.git" ../atlaskit-registry
mkdir -p ../atlaskit-registry/_data ../atlaskit-registry/api ../atlaskit-registry/resources

# Install panop (converts monorepo to single YAML summary file)
echo "Installing panop from Atlassian private npm"
if [ -n "$NPM_TOKEN" ]
  npm set @atlassian:registry "https://npm-private.atlassian.io/"
  npm set //npm-private.atlassian.io/:_authToken=$NPM_TOKEN
fi
npm install --progress=false @atlassian/panop

# Generate momnorep summary which will feed into jekyll
echo "Generating summary files using panop"
BITBUCKET_PASS=$BITBUCKET_PW_READONLY `npm bin`/panop --repo=atlassian/atlaskit \
  --yml=../atlaskit-registry/_data/components.yml \
  --json=../atlaskit-registry/api/full.json

# Install atlaskit-registry dependencies
echo "Installing jekyll"
bundle install --quiet --gemfile=../atlaskit-registry/Gemfile

# Build website using jekyll
echo "Building site using Jekyll"
jekyll build --source ../atlaskit-registry --destination ../atlaskit-registry/resources/_site
rm -f ../ak-registry-cdn.zip
zip -0 -r -T ../ak-registry-cdn.zip ../atlaskit-registry/resources

# Authenticate with Atlassian Maven (only required for BB pipelines)
if [ -n "$MVN_USERNAME" ]
  sed -i'back' "/<servers>/ a<server><id>atlassian-private</id><username>$MVN_USERNAME</username><password>$MVN_PASSWORD</password></server>" /usr/share/maven/conf/settings.xml
  sed -i'bak' '/<profiles>/ a<profile><id>atlassian-private</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-private</id><name>Atlassian Private</name><url>https://maven.atlassian.com/content/repositories/atlassian-private/</url><layout>default</layout></repository></repositories><pluginRepositories><pluginRepository><id>atlassian-private</id><url>https://maven.atlassian.com/content/groups/internal</url></pluginRepository></pluginRepositories></profile>' /usr/share/maven/conf/settings.xml
  sed -i'bak' '/<profiles>/ a<profile><id>atlassian-public</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-public</id><url>https://maven.atlassian.com/repository/public</url></repository></repositories></profile>' /usr/share/maven/conf/settings.xml
fi

# Install CDN upload tool from Maven
echo "Installing CDN tool"
mvn -B dependency:copy -Dartifact=com.atlassian.scripts.prebake.distributor:prebake-distributor-runner:0.22.0 -Dmdep.stripClassifier=true -Dmdep.stripVersion=true -Dsilent=true -DoutputDirectory=..

# Upload to CDN
echo "Uploading to Atlassian CDN..."
java -jar ../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=../ak-registry-cdn.zip

# Invalidate CDN caches
npm install cloudfront-invalidate-cli@1.0.3 -g
echo "CDN invalidation starting now (this may take some time)"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- EVOK132JF0N16 '/atlaskit/registry/*'
echo "CDN invalidation finished."
