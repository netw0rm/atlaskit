# Lozenge

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-lozenge
```

## Using the component

### HTML

The `ak-lozenge` package exports the Lozenge [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-lozenge';
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
  <ak-lozenge></ak-lozenge>
</body>
```

or from within another JavaScript resource:

```js
import Lozenge from 'ak-lozenge';

const component = new Lozenge();
document.body.appendChild(component);
```

### React

```js
import Lozenge from 'ak-lozenge';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Lozenge, {});

ReactDOM.render(<ReactComponent />, container);
```
