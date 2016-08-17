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

For the dropdown to work it has to include trigger and list of elements. Simple example of a dropdown:

```
<ak-dropdown>
  <ak-dropdown-trigger slot="trigger">Some text</ak-dropdown-trigger>
  <ak-dropdown-item slot="list">first item</ak-dropdown-item>
  <ak-dropdown-item slot="list">second item</ak-dropdown-item>
  <ak-dropdown-item slot="list">third item</ak-dropdown-item>
</ak-dropdown>
```

Trigger by default is not styled. Any html element could be used as the trigger (button, tab item, etc):

```
<ak-dropdown>
  <ak-dropdown-trigger slot="trigger"><ak-trigger-button>Button as the trigger</ak-trigger-button></ak-dropdown-trigger>
  <ak-dropdown-item slot="list">first item</ak-dropdown-item>
</ak-dropdown>
```

### React

```
import Dropdown from 'ak-dropdown';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Dropdown, {});

ReactDOM.render(<ReactComponent />, container);
```
## Dropdown API
* Properties

    *  [`Dropdown.open`](#Dropdown.open) : Boolean

### Constructor
The definition for the Dropdown component.

**HTML Example**
```js
<ak-dropdown></ak-dropdown>
```
**JS Example**
```js
import Dropdown from 'ak-dropdown';
const dropdown = new Dropdown();
```
### `Dropdown.open` : Boolean
Open/closed state of the dropdown

**Kind**: static property of Dropdown  
**Default**: `false`  
**HTML Example**
```js
<ak-dropdown open></ak-dropdown>
```
**JS Example**
```js
dropdown.open = true;
```
