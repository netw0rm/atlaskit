# TextField

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-text-field
```

## Using the component

### HTML

The `ak-text-field` package exports the TextField [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-text-field';
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
  <ak-text-field></ak-text-field>
</body>
```

or from within another JavaScript resource:

```js
import TextField from 'ak-text-field';

const component = new TextField();
document.body.appendChild(component);
```

### React

```js
import TextField from 'ak-text-field';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(TextField, {});

ReactDOM.render(<ReactComponent />, container);
```
