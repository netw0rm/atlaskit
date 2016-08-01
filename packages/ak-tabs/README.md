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
## Tabs API
* Properties

    *  [`tabs.onSelect`](#Tabs+onSelect) : function
    *  [`tabs.onDeselect`](#Tabs+onDeselect) : function

### Constructor
Tabs are an easy way to view and switch between different views of the same content.

**JS Example**
```js
import Tabs from 'ak-tabs';
const tabs = new Tabs();
```
### `tabs.onSelect` : function
Handler for selecting a tab.

**Kind**: instance property of Tabs  
### `tabs.onDeselect` : function
Handler for deselecting a tab.

**Kind**: instance property of Tabs  
## Tab API
* Properties

    *  [`tab.label`](#Tab+label) : string
    *  [`tab.selected`](#Tab+selected) : Boolean

* Events

    *  [`"ak-tab-select"`](#Tab+event_ak-tab-select)
    *  [`"ak-tab-deselect"`](#Tab+event_ak-tab-deselect)

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
### `tab.selected` : Boolean
Whether the tab is selected. Only one tab can be selected at a time,

**Kind**: instance property of Tab  
### `"ak-tab-select"`
Fired when a tab is selected.

**Kind**: event emitted by Tab  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.tab | Tab | The tab element. |
| detail.keyboardNav | Tab | Whether the tab was selected via a key press. |

### `"ak-tab-deselect"`
Fired when a tab is deselected.

**Kind**: event emitted by Tab  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.tab | Tab | The tab element. |
