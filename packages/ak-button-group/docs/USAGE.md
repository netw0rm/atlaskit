# ButtonGroup

## Synopsis

A button group provides a visual grouping for related Button (`<ak-button>`) elements. You can use this component whenever you have multiple buttons with related actions, such as as the pull requests Approve and Decline buttons.

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
  <ak-button-group>
    <ak-button>One</ak-button>
    <ak-button>Two</ak-button>
    <ak-button>Three</ak-button>
  </ak-button-group>
</body>
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```
import ButtonGroup from 'ak-button-group';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ButtonGroup, {});

ReactDOM.render(<ReactComponent />, container);
```
