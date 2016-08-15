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
## ButtonGroup API
* Properties

    *  [`buttonGroup.name`](#ButtonGroup+name) : string

* Methods

    *  [`buttonGroup.announce()`](#ButtonGroup+announce) ⇒ ButtonGroup

* Events

    *  [`"announce-name"`](#ButtonGroup+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import ButtonGroup from 'ak-button-group';
const component = new ButtonGroup();
```
### `buttonGroup.name` : string
The name of the ButtonGroup element.

**Kind**: instance property of ButtonGroup  
**Default**: `"ButtonGroup"`  
### `buttonGroup.announce()` ⇒ ButtonGroup
Fire an event containing the name of the element.

**Kind**: instance method of ButtonGroup  
**Returns**: ButtonGroup - The ButtonGroup element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by ButtonGroup  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
