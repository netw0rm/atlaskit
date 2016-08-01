# Tabs

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-tabs
```

## Using the component

### HTML

The `ak-tabs` package exports the Tabs [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import Tabs from 'ak-tabs';
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
  <ak-tabs></ak-tabs>
</body>
```

### React

```
import Tabs from 'ak-tabs';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tabs, {});

ReactDOM.render(<ReactComponent />, container);
```
## Component API

### Constructor
Tabs are an easy way to view and switch between different views of the same content.

**JS Example**
```js
import Tabs from 'ak-tabs';
const component = new Tabs();
```
## Component API

* Properties

    *  [`tab.label`](#Tab+label) : string
    *  [`tab.selected`](#Tab+selected)

### Constructor
Tabs are an easy way to view and switch between different views of the same content.

**JS Example**
```js
import Tab from 'ak-tab';
const component = new Tab();
```
### `tab.label` : string
The label to display in the tab navigation

**Kind**: instance property of Tab  
### `tab.selected`
Whether the tab is selected.

**Kind**: instance property of Tab  
