# RadioButton

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-radio-button
```

## Using the component

### HTML

The `ak-radio-button` package exports the RadioButton [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import RadioButton from 'ak-radio-button';
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
  <ak-radio-button></ak-radio-button>
</body>
```

### React

```
import RadioButton from 'ak-radio-button';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(RadioButton, {});

ReactDOM.render(<ReactComponent />, container);
```

## RadioButton API
* Properties

    *  [`radioButton.name`](#RadioButton+name) : string

* Methods

    *  [`radioButton.announce()`](#RadioButton+announce) ⇒ RadioButton

* Events

    *  [`"announce-name"`](#RadioButton+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import RadioButton from 'ak-radio-button';
const component = new RadioButton();
```
### `radioButton.name` : string
The name of the RadioButton element.

**Kind**: instance property of RadioButton  
**Default**: `"RadioButton"`  
### `radioButton.announce()` ⇒ RadioButton
Fire an event containing the name of the element.

**Kind**: instance method of RadioButton  
**Returns**: RadioButton - The RadioButton element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by RadioButton  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
