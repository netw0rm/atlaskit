# Reduced UI Pack

This package exports a CSS file which includes some CSS classes that provide styling for a reduced number of AtlasKit components.

There is also an icon SVG sprite sheet included. See the "Try it out" section below for usage instructions.

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### Importing

The `@NAME@` package can be consumed via the dist, or in Webpack.

#### Importing in Webpack

```js
import '@NAME@';
```

The Webpack style loader should then place the CSS within the HEAD of your HTML element.

#### Importing in HTML

```html
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@NAME@/dist/bundle.css" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```
