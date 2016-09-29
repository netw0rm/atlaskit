# Validator

Validator components are used to define validation rules that should be applied to an `ak-field` component.

## Installation

```sh
npm install ak-validator
```

## Using default validators

The `ak-validator` package exports the several predefined validator [Skate](https://github.com/skatejs/skatejs) components.

There are default validators for:

* Min length
* Max length
* Required fields

### HTML

Import the component in your JS resource:

#### bundle.js

```js
import { ValidatorMinLength } 'ak-validator';
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
      <ak-validator-min-length min-length="5" slot="validator"></ak-validator-min-length>
      <ak-field-text></ak-field-text>
    </ak-field>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import ValidatorMinLength from 'ak-validator';

const component = new ValidatorMinLength();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import { ValidatorMinLength } from 'ak-validator';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ValidatorMinLength, {});

ReactDOM.render(<ReactComponent />, container);
```

## Defining a custom validator

This package exports a factory method for defining custom validators.

```js
import defineValidator from 'ak-validator';

const ValidatorIsEven = defineValidator('x-validator-is-even', 
  function validate(value) {
    return value %% 2 === 0;
  }
);
```

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <ak-field>
      <x-validator-is-even slot="validator"></x-validator-is-even>
      <ak-field-text></ak-field-text>
    </ak-field>
  </body>
</html>
```
