#!/usr/bin/env bash
set -e

CURRENT_DATE=$(date +'%Y-%m-%d')
TAG="atlassianlabs/atlaskit:$CURRENT_DATE"
PREBAKE_VERSION=0.22.0

echo "Deleting old prebake-distributor-runner"
rm -f prebake-distributor-runner.jar

echo "Installing prebake-distributor-runner"
# From https://bitbucket.org/atlassian/atlassian-webresource-prebake-distributor/overview
mvn -q -B dependency:copy \
  -Dartifact=com.atlassian.scripts.prebake.distributor:prebake-distributor-runner:$PREBAKE_VERSION \
  -Dmdep.stripClassifier=true \
  -Dmdep.stripVersion=true \
  -DoutputDirectory=.

echo "Building image"
docker build -t "$TAG" .


echo "Let's make sure we have everything"
set -x
docker run "$TAG" node --version
docker run "$TAG" npm -v
docker run "$TAG" ruby -v
docker run "$TAG" bundler -v
docker run "$TAG" lerna --version
docker run "$TAG" curl --version
docker run "$TAG" python --version
docker run "$TAG" git --version
docker run "$TAG" java -version
set +x

echo
echo "Successfully created image '$TAG'"

echo
read -p "Do you want to publish this image? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  docker push "$TAG"
  echo "Now go and update the bitbucket-pipelines.yml with the new image: $TAG"
fi
