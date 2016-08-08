# ButtonGroup

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-button-group
```

## Using the component

### HTML

The `ak-button-group` package exports the ButtonGroup [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import ButtonGroup from 'ak-button-group';
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
  <ak-button-group></ak-button-group>
</body>
```

### React

```
import ButtonGroup from 'ak-button-group';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ButtonGroup, {});

ReactDOM.render(<ReactComponent />, container);
```
