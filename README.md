Atlaskit
==============
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![node](https://img.shields.io/badge/node-6.10%2B-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-3.8%2B-brightgreen.svg)]()
[![yarn](https://img.shields.io/badge/yarn-0.18.1-brightgreen.svg)]()

Atlaskit is the technical implementation of the [Atlassian Design Guidelines][ADG]. It is a collection of reusable components that can be downloaded independently into your projects. Each component is also independently versioned and published to npm. The full list of components can be found in the [Atlaskit Registry][AtlaskitRegistry].

**This project is bound by a [Code of Conduct][codeofconduct].**

Usage
======

#### Pre-requisites
It's strongly advised to use the Atlaskit CSS reset in your whole project, or some Atlaskit components
may diverge in appearance:

```javascript
import '@atlaskit/css-reset';
```

In general, you should avoid directly styling base elements (ex. p, h1, h2…) and uses classes instead.

#### Example for React projects

Atlaskit components are built for React. Here's an example of using the Avatar component:

1. First, you specify a component into your project as a dependency using npm: `npm install @atlaskit/avatar`
2. Then you can use it in your React projects like this:

```
import React from 'react';
import Avatar from '@atlaskit/avatar';

export default (
  <Avatar
    src="https://design.atlassian.com/images/avatars/project-128.png"
    presence="online"
    size="large"
  />
);
```
Check out the [Atlaskit Registry][AtlaskitRegistry] to learn more.

#### Example for non-React projects

There is a subset of components available as styles called the Reduced UI pack.
To use:

1. You include these into your the HTML projects.

```
<link rel="stylesheet" href="//unpkg.com/@atlaskit/css-reset@latest" />
<link rel="stylesheet" href="//unpkg.com/@atlaskit/reduced-ui-pack@latest" />
```
2. Then you can style HTML with

`<button class="ak-button ak-button__appearance-primary">Submit</button>`

Check out the [Reduced UI pack](http://go.atlassian.com/reduced-ui-pack) for more examples and details.


Installation
============

#### Before you start

* [node](https://nodejs.org/) version should be 6 or above (to check `node -v`) or use [nvm](https://github.com/creationix/nvm)
* [npm](https://www.npmjs.com/) version should be 3 or above (to check `npm --version`)
* [yarn](https://yarnpkg.com/) should be installed globally (see yarn website for installation instructions)
* [watchman](https://facebook.github.io/watchman/docs/install.html) should be installed to enable running tests in watch mode

#### Clone the repo and install

```
git clone git@bitbucket.org:atlassian/atlaskit.git
yarn
```
You're now ready to start developing in Atlaskit!

Each component/util lives in it's own package under the `packages` directory. You can build those all at once or individually using

```
yarn run bootstrap
# cleans, installs and links all packages in the repository
```

```
yarn run bootstrap/single @atlaskit/packageName
# cleans, installs and links only a single package
```

```
yarn run bootstrap/single/with-deps @atlaskit/packageName
# cleans, installs and links a single package AND all of it's dependencies
```

Once you made some changes, stage them and then commit them using `yarn run commit` (This will use [Commitizen](https://github.com/commitizen/cz-cli) under the covers).


Documentation
=============
A comprehensive list of components and detailed usage of each can be found in the [Atlaskit Registry][AtlaskitRegistry].

You can also find how each component is meant to be used from a design perspective on the [Atlassian Design Guidelines][ADG] website.

Tests
=====

### Running unit tests with jest

For packages that use Jest (every package except those used by the Fabric team), we are using Jest as a test runner. These tests live inside a packages `packages/<packageName>/test/unit` folder. Every file in this folder is considered a test and must have at least one test function in it, unless the filename begins with an underscore.

While developing, it is useful to run jest in watch-mode. We recommend running Jest in watch-mode from the root, so it runs all the tests affected by a change. Since the tests run so quickly, this is going to give you the best possible coverage of any of your changes.

* To run the full unit test suite: run `yarn run test:unit` from the repository root
* To run the tests for a single package:
  * run (cd packages/<packageName>; yarn run test:unit)
  * run `yarn run lerna -- run test:unit --stream --scope=@atlaskit/<packageName>` from the repository root
* To run the unit tests in watch mode for development/tdd: run `yarn run test:unit -- --watch` from the repository root. Note: This might require the installation of [Watchman](https://facebook.github.io/watchman/docs/install.html). If this command fails, please install watchman and retry.

### Running tests in the browser

For the packages that require karma to run tests in the browser (at preset, the editor-* packages), the following commands apply:

* To run all browser tests: run `yarn run test:browser` from the repository root
* To run the tests for a single package:
  * run (cd packages/<packageName>; yarn run test:browser)
  * run `yarn run lerna -- run test:browser --stream --scope=@atlaskit/<packageName>` from the repository root
* To continuously run tests for a single component: `cd packages/<packageName>; yarn run test:browser -- --watch`

Reporting issues
============

We believe in open contributions and the power of a strong development community. Please read our [Contributing guidelines][CONTRIBUTING] on how to contribute back and report issues to Atlaskit.


Contributors
============

Pull requests, issues and comments are welcomed. For pull requests:

* Add tests for new features and bug fixes
* Follow the existing style
* Separate unrelated changes into multiple pull requests
* Read [Contributing guidelines][CONTRIBUTING] for more details

See the existing issues for things to start contributing.

For bigger changes, make sure you start a discussion first by creating
an issue and explaining the intended change.

Atlassian requires contributors to sign a Contributor License Agreement,
known as a CLA. This serves as a record stating that the contributor is
entitled to contribute the code/documentation/translation to the project
and is willing to have it used in distributions and derivative works
(or is willing to transfer ownership).

Prior to accepting your contributions we ask that you please follow the appropriate
link below to digitally sign the CLA. The Corporate CLA is for those who are
contributing as a member of an organization and the individual CLA is for
those contributing as an individual.

* [CLA for corporate contributors](https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=e1c17c66-ca4d-4aab-a953-2c231af4a20b)
* [CLA for individuals](https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=3f94fbdc-2fbe-46ac-b14c-5d152700ae5d)

License
========

This is a [mono-repo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md), which means that different parts of this repository can have different licenses.

The base level of the repository is licensed under [Apache 2.0][LICENSE]. There are separate license files (`LICENSE`)  for each component under `/packages` that specify the license restrictions for each component. While most components are licensed under the Apache 2.0 license, please note packages containing styles, assets & icons are most likely licensed under the [Atlassian Design Guidelines license][ADG_License].

If you fork this repository you can continue to use those Atlassian Design Guidelines licensed components only under the given license restrictions. If you want to redistribute this repository, you will need to replace these Atlassian Design Guidelines licensed components with your own implementation.

Copyright (c) 2016 Atlassian and others.


[ADG]: http://atlassian.design/ "Atlassian Design Guidelines"
[ADG_License]: http://atlassian.design/license
[CONTRIBUTING]: ./CONTRIBUTING.md
[LICENSE]: ./LICENSE
[AtlaskitRegistry]: https://atlaskit.atlassian.com/  "Atlaskit Registry"
[CODEOFCONDUCT]: ./CODE_OF_CONDUCT.md
