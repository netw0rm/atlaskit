# CssReset

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example ak-css-reset](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-css-reset/docs/screencast.gif)

## Try it out

Interact with a [live demo of the ak-css-reset component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-css-reset/@VERSION@/).

## Installation

```sh
npm install ak-css-reset
```

## Using the component

### HTML

The `ak-css-reset` package exports the CssReset [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-css-reset';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-css-reset></ak-css-reset>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import CssReset from 'ak-css-reset';

const component = new CssReset();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import CssReset from 'ak-css-reset';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(CssReset, {});

ReactDOM.render(<ReactComponent />, container);
```
