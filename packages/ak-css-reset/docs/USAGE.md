# CssReset

This package exports a CSS file which provides a minimal reset along with base styles for many HTML elements. It is meant to be used as a basis for all styling to be built upon.

## Try it out

Interact with a [live demo of the ak-css-reset component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-css-reset/@VERSION@/).

## Installation

```sh
npm install ak-css-reset
```

## Using the component

### Importing

The `ak-css-reset` package can be consumed via the dist, or in Webpack.

#### Importing in Webpack

```js
import 'ak-css-reset';
```

The Webpack style loader should then place the CSS within the HEAD of your HTML element.

#### Importing in HTML

```html
<html>
  <head>
    <link rel="stylesheet" href="dist/bundle.css" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```