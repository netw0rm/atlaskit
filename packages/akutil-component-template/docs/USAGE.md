# AkUtilComponentTemplate

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install akutil-component-template
```

## Using the component

### HTML

The `akutil-component-template` package exports the AkUtilComponentTemplate [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'akutil-component-template';
```

Now we can use the defined tag in our HTML markup, e.g.:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <akutil-component-template></akutil-component-template>
  </body>
</html>
```

or from within another JavaScript resource:

```js
import AkUtilComponentTemplate from 'akutil-component-template';

const component = new AkUtilComponentTemplate();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import AkUtilComponentTemplate from 'akutil-component-template';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkUtilComponentTemplate, {});

ReactDOM.render(<ReactComponent />, container);
```
