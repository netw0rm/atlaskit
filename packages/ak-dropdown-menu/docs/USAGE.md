# DropdownMenu

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example ak-dropdown-menu](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-dropdown-menu/docs/screencast.gif)

## Try it out

Interact with a [live demo of the ak-dropdown-menu component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-dropdown-menu/@VERSION@/).

## Installation

```sh
npm install ak-dropdown-menu
```

## Using the component

### HTML

The `ak-dropdown-menu` package exports the DropdownMenu [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-dropdown-menu';
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
    <ak-dropdown-menu></ak-dropdown-menu>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import DropdownMenu from 'ak-dropdown-menu';

const component = new DropdownMenu();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import DropdownMenu from 'ak-dropdown-menu';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(DropdownMenu, {});

ReactDOM.render(<ReactComponent />, container);
```
