# AtlasKit

## Development

### Clean node_modules
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
