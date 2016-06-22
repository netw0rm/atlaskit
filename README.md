#AtlasKit
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Atlaskit is the Design Platform's implementation of ADG3. It is a collection of reusable webcomponents that can be consumed independently (No more upgrade pains!). Each component is independently versioned and published to npm and can be installed through

```
npm install @atlaskit/my-component-name
```

#How do I... ...

##Generate a new component skeleton
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
    |-- test/
       |-- index.js
       |-- .eslint.rc
    |-- demo/
       |-- index.js
       |-- index.ejs
       |-- index.less
    |-- package.json

```

##Demo a component
You can see your component running by staring a local dev-server

###Starting a dev-server

```
npm run dev/single my-component-name
```
This will create a bundle of all your component code and it's dependencies and all the code in your `demo/` directory. It will then start up a [webpack-dev-server]() on `localhost:8080` and serve these files. It will automatically watch for changes and [hot-reload](link to hotreloading) them on the fly.

###Demo page
The entry point for your component demo will be `demo/index.ejs`. Your dependencies will automatically be injected by webpack. Any extra javascript you need to include on the page can be in `demo/index.js`.

###Adding more demo pages
You might choose to separate out your demo into multiple pages. Simply create a new `.ejs` file and link to it from the index page

##Flesh-out a component
The functionality of your component will be contained in `src/index.js`. The template will contain a skate definition and styles will already be linked.

##Style a component
Styles for Atlaskit components are written in Less and are separated into three main files by default (`host.less`, `shadow.less`, `shared.less`).

###host.less
Is where you write styles that affect the component itself.

* These styles will be compiled and placed into the head of the page at runtime.
* They cannot affect the shadow DOM of a component (use `shadow.less` for that).
* This is where you would usually place rules that are based on attributes.

###shadow.less
Is where you write styles that affect the shadow DOM of your component

* These are compiled and placed into the shadow DOM of each **instance** of a component
  `vdom.style(shadowStyles.toString());`
* These do not have access to the root element.

###shared.less
This is where you can write styles that need to be shared between `shadow.less` and `host.less`. (Note the `@import 'shared.less';` at the top). This should only be used for shared variables, not shared rules. By default, this will already include the shared colors from the `share-styles` package.

##Add an animation to a component

##Add a dependency to a component
Ensure that when running `npm install --save ...` you are in the components directory, **not in the root!**.

##Verify a component bundle
If you want to check that webpack is correctly bundling your component, you can build it locally to confirm.

```
npm run webpack/single my-component-name
```
This will build the component and place the generated bundle under `packages/my-component-name/dist/bundle.js`. You can also pass flags to webpack by separating them with an extra `--`

```
npm run webpack/single my-component-name -- --min --bundle-deps
```

* `--min` will produce a `bundle.min.js` file as well
* `--bundle-deps` will also bundle all the dependencies of the component

##Test my component

###Unit tests
To run unit tests for a single component:

```
npm run test/single my-component-name
```
To continuously run tests for a single component:

```
npm run test/single/watch my-component
```
###Browserstack tests
Browserstack is a tool that lets you run your unit tests in a larger set of browsers running different versions.

To run the Browserstack tests for a single component:

```
BROWSERSTACK_USERNAME=... BROWSERSTACK_KEY=... npm run test/single/browserstack ak-util-common
```
###Monkey tests
Monkey tests are a technique where the user tests the application or system by providing random inputs and checking the behavior, or seeing whether the application or system crashes. We do this using [Gremlins.js](tools.md#markdown-header-gremlins).

To run monkey tests for a single component:

```
npm run test/single/monkey my-component
```
This will open your browser to `localhost:8080` and show a bunch of red lines and circles representing the random inputs to your page.

This will run for X mins and report errors ...

##Follow code style guidelines
We are adhering to the [Airbnb](https://github.com/airbnb/javascript) javascript linting rules, which can be quite strict. Eslint will automatically run when attempting to commit, but can also run at any time using:

```
npm run lint
```
*Note: a lot of linting issues can be fixed automatically by passing the --fix flag to eslint*

```
npm run lint -- --fix
```

##Commit changes
To ensure that all commit messages are formatted correctly, we use Commitizen in this repository. It provides a [Yeoman](http://yeoman.io/)-like interface that creates your commit messages for you. Firstly, make sure you have it installed globally (see [Getting Started](#before-you-get-started)). Now running commitizen should be as simple as running `git cz` from the root of the repo. You can pass all the same flags you would normally use with `git commit`.

```
git cz [-a]
```
Note: it is advised to run the [linting](README.md#markdown-header-linting) *before* you commit, to prevent you from having to answer all the questions twice.


##Merge into master
All new feature code must be completed in a feature branch.

Once you are happy with your changes, you must push your branch to Bitbucket and create a pull request. All pull requests must have at least 2 reviewers from the Atlaskit team. Once the pull request has been approved it may be merged into master.

**Attention! Achtung! Bнимaние! Atención! ध्यान! 注意!**: *Merging into master will automatically release a component. See below for more details*

##Release a component
Releasing components is completely automated. The process of releasing will begin:

* Linting is run
* Tests will be run in Browserstack
* Component dist is built
* Semantic Relase will bump the versions for any component that has changed
* Change log is generated automatically from commit messages
* Component will be published to npm

##Make a change to the default component template

###Update the documentation (reminder)

##Make changes to the Pipelines build
Atlaskit uses Bitbucket Pipelines for it's continuous integration. The build scripts are defined in `bitbucket-pipelines.yml`.

###Atlaskit Docker image
Bitbucket pipelines works using a Docker image. This contains the initial setup required to run the build. If you need to make changes to `Dockerfile`, you will need to push them to Dockerhub:

* Build the new Docker image: `docker build -t atlaskit .`
* Create the new Docker tag: `docker tag <IMAGE_ID> <YOUR-USER>/atlaskit:latest`
* Push new image to Dockerhub: `docker push <YOUR-USER>/atlaskit`

**Make sure you also update the `bitbucket-pipelines.yml` file with the name of your new image!**
