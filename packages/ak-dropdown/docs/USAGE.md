# Dropdown

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Try it out

Interact with a [live demo of the ak-dropdown component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-dropdown/@VERSION@/).

## Setting up and install

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

Now you can use the defined tag in your HTML markup:

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

For the dropdown to work it has to include trigger and list of elements. Simple example of a dropdown:

```
<ak-dropdown>
  <ak-dropdown-trigger slot="trigger">Some text</ak-dropdown-trigger>
  <ak-dropdown-item>first item</ak-dropdown-item>
  <ak-dropdown-item>second item</ak-dropdown-item>
  <ak-dropdown-item>third item</ak-dropdown-item>
</ak-dropdown>
```

Trigger by default is not styled. Any html element could be used as the trigger (button, tab item, etc):

```
<ak-dropdown>
  <ak-dropdown-trigger slot="trigger"><ak-trigger-button>Button as the trigger</ak-trigger-button></ak-dropdown-trigger>
  <ak-dropdown-item>first item</ak-dropdown-item>
</ak-dropdown>
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).


```
import Dropdown from 'ak-dropdown';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Dropdown, {});

ReactDOM.render(<ReactComponent />, container);
```
