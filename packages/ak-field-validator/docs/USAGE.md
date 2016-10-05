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

This package exports a base class, which can be extended to add any custom validator behaviour.

```js
import { define } from 'skatejs';
import { ValidatorBase }from 'ak-field-validator';

const ValidatorIsEven = define('x-validator-is-even', ValidatorBase.extend({
  prototype: {
    validate(value) {
      return value %% 2 === 0;
    },
  },
});
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <ak-field>
      <x-validator-is-even slot="validator">Value must be even</x-validator-is-even>
      <ak-field-text slot="input"></ak-field-text>
    </ak-field>
  </body>
</html>
```
