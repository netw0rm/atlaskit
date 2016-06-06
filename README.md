# AtlasKit

## Development

### Before you get started
You will need to install [Commitizen](https://github.com/commitizen/cz-cli) globally to be able to commit to this repo. It is important that *all* commits in this repo are properly formatted, commitizen helps you do that (see [committing](#committing)).

```
npm install -g commitizen
``` 

### Run webpack
Bundles the component and all non-named imports into `dist/bundle.js`
For a specific component:

```
npm run webpack/single my-component
```
Extra parameters can be passed to webpack by using an empty `--` argument to separate them:

```
npm run webpack/single my-component -- --min --bundle-deps
```
### Run webpack-dev-server
Bundles up all dependencies into one bundle.js file and runs the local `webpack-dev-server` for specified package:

```
npm run dev/single my-component
```
All dependencies will be watched and automatically swapped out as they change.

*Note: webpack-dev-server does not write to disk at any point, all files are stored in memory only.*
### Clean node_modules and dist directories
For all modules and main repository:

```
npm run clean
```

### Testing
Run a tests for a single component:

```
npm run test/single my-component
```

Continuously run tests for a single component:

```
npm run test/single/watch my-component
```

Run the saucelabs tests for a single component:

```
SAUCE_USERNAME=... SAUCE_ACCESS_KEY=... npm run test/single/saucelabs sean-button
```
### Linting
We are adhering to the [Airbnb](https://github.com/airbnb/javascript) javascript linting rules, which can be quite strict. Eslint will automatically be run when attempting to commit, but can also be run at any time using:

```
npm run lint
```
*Note: a lot of linting issues can be fixed automatically by passing the --fix flag to eslint*

```
npm run lint -- --fix
```
### Committing
To ensure that all commit messages are formatted correctly, we use Commitizen in this repository. It provides a [Yeoman](http://yeoman.io/)-like interface that creates your commit messages for you. Firstly, make sure you have it installed globally (see [Getting Started](#before-you-get-started)). Now running commitizen should be as simple as running `git cz` from the root of the repo.

```
git cz
```
Note: it is advised to run the [linting](#linting) *before* you commit, to prevent you having to answer all the questions twice.

### Publishing
Run prepublish for a single component:

```
npm run prepublish/single my-component
```

## Dockerfile
* `docker build -t atlaskit .`
* `docker tag <IMAGE_ID> <YOUR-USER>/atlaskit:latest`
* `docker push <YOUR-USER>/atlaskit`
