# AtlasKit
[![master build](https://bitbucket-badges.atlassian.io/badge/atlassian/atlaskit.svg)](https://bitbucket.org/atlassian/atlaskit/addon/pipelines/home)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![node](https://img.shields.io/badge/node-6.10%2B-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-3.8%2B-brightgreen.svg)]()

AtlasKit is the Design Platform's implementation of ADG3. It is a collection of reusable webcomponents that can be consumed independently (No more upgrade pains!). Each component is independently versioned and published to npm and can be installed through

```
npm install @atlaskit/my-component-name
```

# Reporting issues

Please refer to [our issue tracker](https://ecosystem.atlassian.net/projects/AK).

# Licensing

This is a [mono-repo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md),
which means that different parts of this repository can have different licenses.
Anything on the base level is licensed as Apache-2.0. Every folder inside `/packages` has its own
license file, please refer to the license file to find out more what you can and can not do with the
respective sub-component.
Most components are also licensed under the Apache-2.0 license, however some of the components are licensed under different licenses
(please refer to the `LICENSE` file in each package). Please note that especially packages containing styles & icons are licensed under the [Atlassian Design Guidelines license](https://design.atlassian.com/license/).
Be aware that if you fork this repository you can continue to use those Atlassian Design Guidelines licensed components only under the given license restrictions.
If you want to redistribute this whole repository you will need to replace these components with your own implementation.

# Development

### Getting started
Clone the repo and install the dependencies

```
git clone git@bitbucket.org:atlassian/atlaskit.git
npm install
```
You're now ready to start developing in AtlasKit!

Once you made some changes, stage them and then commit them using `npm run commit` (This will use [Commitizen](https://github.com/commitizen/cz-cli) under the covers).

# How do I...

## Generate a new component skeleton
```npm run create my-component-name```

Will create a new templated component under `packages/my-component-name` with everything you need to get started.

```
|-- packages/
   |-- my-component-name/
     |-- src/
        |-- host.less
        |-- shadow.less
        |-- index.js
        |-- shared-variables.less
    |-- stories/
       |-- example-story.js
    |-- test/
       |-- index.js
       |-- .eslint.rc
    |-- package.json

```

You'll then need to install it's dependencies and build by running

```
npm install
```

## Flesh-out a component
The functionality of your component will be contained in `src/index.js`. The template will contain a skate definition and styles will already be linked.

## Style a component
Styles for AtlasKit components are written in Less and are separated into three main files by default (`host.less`, `shadow.less`, `shared.less`).

### Style the host element using host.less
Is where you write styles that affect the component itself.

* These styles will be compiled and placed into the head of the page at runtime.
* They cannot affect the shadow DOM of a component (use `shadow.less` for that).
* This is where you would usually place rules that are based on attributes.

### Style the elements within the Shadow DOM using shadow.less
Is where you write styles that affect the shadow DOM of your component

* These are compiled and placed into the shadow DOM of each **instance** of a component
  `vdom.style(shadowStyles.toString());`
* These do not have access to the root element.

### Share less variables using shared.less
This is where you can write styles that need to be shared between `shadow.less` and `host.less`. (Note the `@import 'shared.less';` at the top). This should only be used for shared variables, not shared rules. By default, this will already include the shared colors from the `share-styles` package.

## Add an animation to a component

## Add a dependency to a component
Ensure that when running `npm install --save ...` you are in the components directory, **not in the root!**.

## Verify a component bundle
If you want to check that webpack is correctly bundling your component, you can build it locally to confirm.

```
npm run prepublish/single my-component-name
```
This will build the component and place the generated bundle under `packages/my-component-name/dist/`.


## Document a component
AtlasKit uses [JSDoc](http://usejsdoc.org/)-style annotations to automatically generate the component API. See the `akutil-component-template` package for examples.

A `README.md` file will be generated at `packages/my-component-name/README.md`. ** Do not edit this README file. ** Your changes will be overwritten.

Instead, modify the `USAGE.md` file, located at `packages/my-component-name/USAGE.md`, with usage instructions and examples for the component.

The README file will be automatically generated at release time by concatenating the file with the generated component API.

You may regenerate the README file at any time with the following command:

```
npm run docs/single my-component-name
```

## Test a component

### Storybook
To run a story book for a single component:
```
npm run storybook/single my-component-name
```

To run the storybook for all components:
```
npm run storybook
```

### Unit tests
To run unit tests for a single component:

```
npm run test/single my-component-name
```

> You can pass arguments to Karma like this: `npm run test/single my-component-name -- --browsers=Chrome`

To continuously run tests for a single component:

```
npm run test/single/watch my-component
```
### Browserstack tests
Browserstack is a tool that lets you run your unit tests in a larger set of browsers running different versions.

To run the Browserstack tests for a single component:

```
BROWSERSTACK_USERNAME=... BROWSERSTACK_KEY=... npm run test/single/browserstack my-component
```

You can also run all the Browserstack tests with Docker (as they are run in the CI):

```
BROWSERSTACK_USERNAME=... BROWSERSTACK_KEY=... docker-compose -f docker-compose-browserstack.yml up
```

Thanks to Browserstack for providing AtlasKit with an open source license!

### Integration tests

> Hint: [docker-compose](https://docs.docker.com/compose/) is needed for this.

Run the integration ([cucumber](https://github.com/cucumber/cucumber-js)) tests for a single component:

```
npm run cucumber/single my-component
```

You can watch the cucumber tests via VNC by replacing the `selenium/node-chrome` with `selenium/node-chrome-debug` in `docker-compose-browserstack.yml` and connect to [vnc://0.0.0.0:5900](vnc://0.0.0.0:5900). Password is `secret`. For more information have a look at the [Selenium docker images](https://github.com/SeleniumHQ/docker-selenium).

> Hint: Whilst cucumber is running (or after a test failed), you can access the [Storybook](http://0.0.0.0:9001/) instance that the tests were run against.

> Hint: If you have problems starting the cucumber setup locally, try re-generating the docker images via: `npm run cucumber/single my-component -- --force-recreate`

## Follow code style guidelines
We are adhering to the [Airbnb](https://github.com/airbnb/javascript) javascript linting rules, which can be quite strict. Eslint will automatically run when attempting to commit, but can also run at any time using:

```
npm run lint
```
*Note: a lot of linting issues can be fixed automatically by passing the --fix flag to eslint*

```
npm run lint -- --fix
```

### Modifying ESLint rules

In order to modify the ESLint rules, you can add the rules to the `.eslintrc` file in the `eslint-config-ak-base` package. In order for you to use your changes immediately without committing and re-running `npm install`, you'll need to manually link it. This is a two-step process:

1. link `eslint-config-ak-base` so NPM knows where to find it
2. link it from the root of the repo

One-liner:

```sh
cd packages/eslint-config-ak-base && npm link && cd ../.. && npm link eslint-config-ak-base
```

Changes to the ESLint rules should be treated like any other package:

- If you fix a rule, it should be considered a fix
- If you add a rule, it should be considered a feature
- If you change / remove a rule, it should be considered breaking

## Commit changes
To ensure that all commit messages are formatted correctly, we use Commitizen in this repository. It provides a [Yeoman](http://yeoman.io/)-like interface that creates your commit messages for you. Running commitizen is as simple as running `npm run commut` from the root of the repo. You can pass all the same flags you would normally use with `git commit`.

```
npm run commit -- -a
```
Note: it automatically runs [linting](#markdown-header-follow-code-style-guidelines) and validation *before* you commit, to prevent you from having to answer all the questions twice.


## Merge into master
All new feature code must be completed in a feature branch.

Once you are happy with your changes, you must push your branch to Bitbucket and create a pull request. All pull requests must have at least 2 reviewers from the AtlasKit team. Once the pull request has been approved it may be merged into master.

**Attention! Achtung! Bнимaние! Atención! ध्यान! 注意!**: *Merging into master will automatically release a component. See below for more details*

## Release a component
Releasing components is completely automated. The process of releasing will begin:

* Linting is run
* Tests will be run in Browserstack
* Component dist is built
* Semantic Relase will bump the versions for any component that has changed
* Change log is generated automatically from commit messages
* Component will be published to npm

## Update a dependency of AtlasKit
* Install AtlasKit - if your installation is from before we had the shrinkwrap file, you should run `npm run clean`.
* Install your new dependency: `npm install my-package --save`.
* Delete the current shrinkwrap file (due to a bug in how shirinkwrap handles dependencies on SHA hashes) `rm -f npm-shrinkwarp.json`
* Run `npm shrinkwrap`
* Create a PR

### Update the documentation (reminder)

## Make changes to the Pipelines build
AtlasKit uses Bitbucket Pipelines for it's continuous integration. The build scripts are defined in `bitbucket-pipelines.yml`.

### AtlasKit Docker image
Bitbucket pipelines works using a Docker image. This contains the initial setup required to run the build. If you need to make changes to `Dockerfile`, you will need to push them to Dockerhub:

* Build the new Docker image: `docker build -t atlaskit .`
* Create the new Docker tag: `docker tag <IMAGE_ID> <YOUR-USER>/atlaskit:latest`
* Push new image to Dockerhub: `docker push <YOUR-USER>/atlaskit`

**Make sure you also update the `bitbucket-pipelines.yml` file with the name of your new image!**
