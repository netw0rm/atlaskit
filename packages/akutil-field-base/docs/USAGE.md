# utilFieldBase

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the akutil-field-base component](https://aui-cdn.atlassian.com/atlaskit/stories/akutil-field-base/@VERSION@/).

## Installation

```sh
npm install akutil-field-base
```

## Using the component

### HTML

The `akutil-field-base` package exports the utilFieldBase [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'akutil-field-base';
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
    <akutil-field-base></akutil-field-base>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import utilFieldBase from 'akutil-field-base';

const component = new utilFieldBase();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import utilFieldBase from 'akutil-field-base';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(utilFieldBase, {});

ReactDOM.render(<ReactComponent />, container);
```
