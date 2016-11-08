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
    <ak-field-text>
      <ak-field-validator-minlength minlength="5" slot="validator-slot"></ak-field-validator-minlength>
    </ak-field-text>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import ValidatorMinlength from 'ak-field-validator';

const validator = new ValidatorMinlength();
validator.minlength = 5;
document.body.appendChild(validator);
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

This package exports the `ValidatorBase` class, which can be extended in order to define a new validator component.

You may simply define a new component by extending the base class and providing a `validatorFunction`
which takes a value and returns a boolean value representing whether the value is valid or not.

The `validatorFunction` takes one arguments:

* `value`: The value to be validated.

You may also refer to the validator element itself using `this`.

```js
import { define } from 'skatejs';
import { ValidatorBase } from 'ak-field-validator';

const ValidatorIsEven = define('x-validator-even-length', class extends ValidatorBase {
  validatorFunction(value) {
    // value: The value to be validated.
    // this: The <x-validator-even-length> element.
    return value.length % 2 === 0;
  }
});
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <form>
      <ak-field-text>
        <x-validator-even-length slot="validator-slot">Field length must be even</x-validator-even-length>
      </ak-field-text>
    </form>
  </body>
</html>
```

### More complex custom validators

More complex validators can be constructed by specifying custom properties and using them in the `validatorFunction`.

*Note*: If you are defining additional properties, it is important to not overwrite the `invalid` property
(which is defined by `ValidatorBase`), e.g. by using `Object.assign`.

```js
import { define } from 'skatejs';
import { ValidatorBase } from 'ak-field-validator';

const ValidatorStartsWith = define('x-validator-starts-with', class extends ValidatorBase {
  static get props() {
    return Object.assign(super.props, {
      start: { attribute: true }
    });
  }
  validatorFunction(value) {
    return value.startsWith(this.start);
  }
});
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <form>
      <ak-field-text>
        <x-validator-starts-with start="foo" slot="validator-slot"></x-validator-starts-with>
      </ak-field-text>
    </form>
  </body>
</html>
```
