#!/usr/bin/env bash
set -e

CURRENT_DATE=$(date +'%Y-%m-%d')
TAG="atlassianlabs/atlaskit:$CURRENT_DATE-yarn"
LERNA_VERSION=$(node -e "console.log(require('./lerna.json').lerna)")

echo "Building image"
docker build --build-arg LERNA_VERSION="$LERNA_VERSION" -t "$TAG" . $@


echo "Let's make sure we have everything"
printf "Node: "
docker run "$TAG" node --version
printf "Yarn: "
docker run "$TAG" yarn --version
docker run "$TAG" ruby -v
docker run "$TAG" bundler -v
printf "Lerna: "
docker run "$TAG" lerna --version
docker run "$TAG" curl --version
docker run "$TAG" python --version
docker run "$TAG" git --version
docker run "$TAG" java -version
docker run "$TAG"  /BrowserStackLocal -version 2>1 /dev/null

echo
echo "Successfully created image '$TAG'"
echo "You can test it via:"
echo "docker run -it \"$TAG\" bash"

echo
read -p "Do you want to publish this image? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  docker push "$TAG"
  echo "Now go and update the bitbucket-pipelines.yml with the new image: $TAG"
fi
