# CssReset

This package exports a CSS file which includes CSS classes that provide styling for a reduced number of Atlaskit components.

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### Importing

The `reduced-ui-pack` package can be consumed via the dist, or in Webpack.

#### Importing in Webpack

```js
import 'reduced-ui-pack';
```

The Webpack style loader should then place the CSS within the HEAD of your HTML element.

#### Importing in HTML

```html
<html>
  <head>
    <link rel="stylesheet" href="node_modules/reduced-ui-pack/dist/bundle.css" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```
