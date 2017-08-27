# Website

This is the source for the [AtlasKit website][new-registry], which provides docs and live examples of AtlasKit components.

The [old registry][old-registry] (which contains addition "non-core" components also living in the AtlasKit repo) is still available.

## Running locally

This package contains it's own build scripts which pulls the live React components examples from `packages/*/docs` in this repo.

To get started, bootstrap all AtlasKit components. We need to bootstrap everything, rather than just bootstrapping a single component.

```sh
yarn run bootstrap
```

And then get the website running:

```sh
cd packages/website
yarn
yarn start # website is now running at http://localhost:8080
```

## Deployment

The site is automatically rebuild and deployed every hour via a [custom task][deploy-task] in the Bitbucket Pipelines configuration.

[new-registry]: https://atlaskit.atlassian.com
[old-registry]: https://aui-cdn.atlassian.com/atlaskit/registry/
[deploy-task]: https://bitbucket.org/atlassian/atlaskit/src/master/bitbucket-pipelines.yml?at=master&fileviewer=file-view-default#bitbucket-pipelines.yml-75
