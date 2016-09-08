# Heatmap

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-heatmap
```

## Using the component

### HTML

The `ak-heatmap` package exports the Heatmap [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-heatmap';
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
  <ak-heatmap></ak-heatmap>
</body>
```

or from within another JavaScript resource:

```js
import Heatmap from 'ak-heatmap';

const component = new Heatmap();
document.body.appendChild(component);
```

### React

```js
import Heatmap from 'ak-heatmap';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Heatmap, {});

ReactDOM.render(<ReactComponent />, container);
```
