#!/usr/bin/env bash
set -e

# Authenticate with Atlassian Maven (only required for BB pipelines)
if [ -n "$MVN_USERNAME" ]
  then
    sed -i'back' "/<servers>/ a<server><id>atlassian-private</id><username>$MVN_USERNAME</username><password>$MVN_PASSWORD</password></server>" /usr/share/maven/conf/settings.xml
    sed -i'bak' '/<profiles>/ a<profile><id>atlassian-private</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-private</id><name>Atlassian Private</name><url>https://maven.atlassian.com/content/repositories/atlassian-private/</url><layout>default</layout></repository></repositories><pluginRepositories><pluginRepository><id>atlassian-private</id><url>https://maven.atlassian.com/content/groups/internal</url></pluginRepository></pluginRepositories></profile>' /usr/share/maven/conf/settings.xml
    sed -i'bak' '/<profiles>/ a<profile><id>atlassian-public</id><activation><activeByDefault>true</activeByDefault></activation><repositories><repository><id>atlassian-public</id><url>https://maven.atlassian.com/repository/public</url></repository></repositories></profile>' /usr/share/maven/conf/settings.xml
fi

# Install CDN upload tool from Maven
echo "Installing S3 uploader (this can take a few minutes)"
mvn -q -B dependency:copy -Dartifact=com.atlassian.scripts.prebake.distributor:prebake-distributor-runner:0.22.0 -Dmdep.stripClassifier=true -Dmdep.stripVersion=true -Dsilent=true -DoutputDirectory=..

echo "Installing cloudfront-invalidate-cli"
npm install -g cloudfront-invalidate-cli@1.0.3
