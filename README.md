# AtlasKit

## Development

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

### Publishing
Run prepublish for a single component:

```
npm run prepublish/single my-component
```

## Dockerfile
* `docker build -t atlaskit .`
* `docker tag <IMAGE_ID> <YOUR-USER>/atlaskit:latest`
* `docker push <YOUR-USER>/atlaskit`
