# Theme

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```sh
npm install ak-theme
```

## Using the component

### HTML

The `ak-theme` package exports the Theme [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-theme';
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
  <ak-theme></ak-theme>
</body>
```

or from within another JavaScript resource:

```js
import Theme from 'ak-theme';

const component = new Theme();
document.body.appendChild(component);
```

### React

```js
import Theme from 'ak-theme';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Theme, {});

ReactDOM.render(<ReactComponent />, container);
```
