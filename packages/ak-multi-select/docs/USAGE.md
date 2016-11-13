# MultiSelect

## Installation

```sh
npm install ak-multi-select
```

## Using the component

### HTML

The `ak-multi-select` package exports the MultiSelect [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-multi-select';
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
    <ak-multi-select></ak-multi-select>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import MultiSelect from 'ak-multi-select';

const component = new MultiSelect();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import MultiSelect from 'ak-multi-select';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(MultiSelect, {});

ReactDOM.render(<ReactComponent />, container);
```
