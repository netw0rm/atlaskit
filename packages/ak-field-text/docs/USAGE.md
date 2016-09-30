# TextField

Provides a standard way to create a text-based form input with an associated label.

When the label is clicked, the input will receive focus as expected.

## Try it out

Interact with a [live demo of the ak-textfield component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-textfield/@VERSION@/).

## Installation

```sh
npm install ak-field-text
```

## Using the component

### HTML

The `ak-field-text` package exports the TextField [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-field-text';
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
  <ak-field-text label="First name" required></ak-field-text>
</body>
```

or from within another JavaScript resource:

```js
import TextField from 'ak-field-text';

const textField = new TextField();
textField.label = 'First name';
textField.required = true;

document.body.appendChild(textInput);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import TextField from 'ak-field-text';
import reactify from 'skatejs-react-integration';

const ReactTextField = reactify(TextField, {});

ReactDOM.render(<ReactTextField />, container);
```
