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
## Tabs
* Properties

    *  [`tabs.name`](#Tabs+name) : string

* Methods

    *  [`tabs.announce()`](#Tabs+announce) ⇒ Tabs

* Events

    *  [`"announce-name"`](#Tabs+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import Tabs from 'ak-tabs';
const component = new Tabs();
```
### `tabs.name` : string
The name of the Tabs element.

**Kind**: instance property of Tabs  
**Default**: `"Tabs"`  
### `tabs.announce()` ⇒ Tabs
Fire an event containing the name of the element.

**Kind**: instance method of Tabs  
**Returns**: Tabs - The Tabs element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by Tabs  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
## Tab
* Properties

    *  [`tab.tabname`](#Tab+tabname) : string

* Methods

    *  [`tab.tabannounce()`](#Tab+tabannounce) ⇒ Tab

* Events

    *  [`"announce-name"`](#Tab+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import Tab from 'ak-tab';
const component = new Tab();
```
### `tab.tabname` : string
The name of the Tab element.

**Kind**: instance property of Tab  
**Default**: `"Tab"`  
### `tab.tabannounce()` ⇒ Tab
Fire an event containing the name of the element.

**Kind**: instance method of Tab  
**Returns**: Tab - The Tab element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by Tab  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
