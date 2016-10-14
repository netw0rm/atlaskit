# Dropdown

Dropdown creates a dropdown menu, with optional sections, headings, icons, checkbox items, radio group items and disabled items.

![Example dropdown](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-dropdown/docs/dropdown.gif)


## Try it out

Interact with a [live demo of the ak-dropdown component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-dropdown/@VERSION@/).

## Installation

```sh
npm install ak-dropdown
```

## Using the component

### HTML

The `ak-dropdown` package exports the Dropdown [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```javascript
import Dropdown from 'ak-dropdown';
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
  <ak-dropdown></ak-dropdown>
</body>
```

The dropdown must include a trigger and a list of elements.

Example:

```
<ak-dropdown>
  <ak-dropdown-trigger slot="trigger">Some text</ak-dropdown-trigger>
  <ak-dropdown-item>first item</ak-dropdown-item>
  <ak-dropdown-item>second item</ak-dropdown-item>
  <ak-dropdown-item>third item</ak-dropdown-item>
</ak-dropdown>
```

The trigger is not styled by default. Any html element can be used as the trigger such as a button or a tab item.
Example:

```html
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
