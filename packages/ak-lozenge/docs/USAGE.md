# Lozenge

Use lozenges to highlight an item's status for quick recognition. Lozenges can be emphasised and can use color to help convey meanings that users can learn and recognize across our products. Use subtle lozenges by default and in instances where they may dominate the screen, such as in long tables.

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
  <ak-lozenge appearance="moved" bold>Moved</ak-lozenge>
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
