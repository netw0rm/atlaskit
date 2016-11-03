# Validator

Validator components are used to define validation rules that should be applied to an `ak-field` component.

## Installation

```sh
npm install ak-field-validator
```

## Using default validators

The `ak-field-validator` package exports several predefined [Skate](https://github.com/skatejs/skatejs) components for validation.

There are default validators for:

* Min length
* Max length
* Required fields

### HTML

Import the component in your JS resource:

#### bundle.js

```js
import { ValidatorMinlength } from 'ak-field-validator';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <ak-field>
      <ak-field-validator-minlength minlength="5" slot="validator"></ak-field-validator-minlength>
      <ak-field-text slot="input"></ak-field-text>
    </ak-field>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import ValidatorMinlength from 'ak-field-validator';

const component = new ValidatorMinlength();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import { ValidatorMinlength } from 'ak-field-validator';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ValidatorMinlength, {});

ReactDOM.render(<ReactComponent />, container);
```

## Defining a custom validator

This package exports a factory function, which will define and return a new validator component.

```js
import { defineValidator } from 'ak-field-validator';

const ValidatorIsEven = defineValidator('x-validator-even-length',
  function(value) {
    return value.length % 2 === 0;
  }
);
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <form>
      <ak-field-text>
        <x-validator-even-length slot="validator">Field length must be even</x-validator-even-length>
      </ak-field-text>
    </form>
  </body>
</html>
```

### More complex custom validators

More complex validators can be constructed by specifying properties and the default error message.

```js
import { defineValidator } from 'ak-field-validator';

defineValidator('x-validator-starts-with',
  (value, elem) => value.startsWith(elem.start),
  {
    start: {
      attribute: true
    }
  },
  (elem) => (`Field value must start with ${elem.start}`)
);
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <form>
      <ak-field-text>
        <x-validator-starts-with starts-with="foo" slot="validator"></x-validator-starts-with>
      </ak-field-text>
    </form>
  </body>
</html>
```
