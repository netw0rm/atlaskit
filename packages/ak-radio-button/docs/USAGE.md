# RadioButton

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-radio-button
```

## Using the component

### HTML

The `ak-radio-button` package exports the RadioButton [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import RadioButton from 'ak-radio-button';
```

Now we can use the defined tag in our HTML markup, e.g.:

#### index.html

```
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-radio-button></ak-radio-button>
</body>
```

### React

```
import RadioButton from 'ak-radio-button';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(RadioButton, {});

ReactDOM.render(<ReactComponent />, container);
```
