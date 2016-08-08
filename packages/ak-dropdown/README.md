# Dropdown

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-dropdown
```

## Using the component

### HTML

The `ak-dropdown` package exports the Dropdown [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import Dropdown from 'ak-dropdown';
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
  <ak-dropdown></ak-dropdown>
</body>
```

### React

```
import Dropdown from 'ak-dropdown';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Dropdown, {});

ReactDOM.render(<ReactComponent />, container);
```