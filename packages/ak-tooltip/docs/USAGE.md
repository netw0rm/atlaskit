# Tooltip

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-tooltip
```

## Using the component

### HTML

The `ak-tooltip` package exports the Tooltip [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-tooltip';
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
  <ak-tooltip></ak-tooltip>
</body>
```

or from within another JavaScript resource:

```js
import Tooltip from 'ak-tooltip';

const component = new Tooltip();
document.body.appendChild(component);
```

### React

```js
import Tooltip from 'ak-tooltip';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tooltip, {});

ReactDOM.render(<ReactComponent />, container);
```
