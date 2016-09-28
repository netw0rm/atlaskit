# TextField

Provides a standard way to create a text-based form input with an associated label.

When the label is clicked, the input will receive focus as expected.

## Setup and install

```sh
npm install ak-text-field
```

## Using the component

### HTML

The `ak-text-field` package exports the TextField [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-text-field';
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
  <ak-text-field label="First name" required></ak-text-field>
</body>
```

or from within another JavaScript resource:

```js
import TextField from 'ak-text-field';

const textField = new TextField();
textField.label = 'First name';
textField.required = true;

document.body.appendChild(textInput);
```

### React

```js
import TextField from 'ak-text-field';
import reactify from 'skatejs-react-integration';

const ReactTextField = reactify(TextField, {});

ReactDOM.render(<ReactTextField />, container);
```
