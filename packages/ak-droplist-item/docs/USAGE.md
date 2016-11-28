# Item

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example ak-droplist-item](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-droplist-item/docs/screencast.gif)

## Try it out

Interact with a [live demo of the ak-droplist-item component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-droplist-item/@VERSION@/).

## Installation

```sh
npm install ak-droplist-item
```

## Using the component

### HTML

The `ak-droplist-item` package exports the Item [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-droplist-item';
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
    <ak-droplist-item></ak-droplist-item>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import Item from 'ak-droplist-item';

const component = new Item();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Item from 'ak-droplist-item';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Item, {});

ReactDOM.render(<ReactComponent />, container);
```
