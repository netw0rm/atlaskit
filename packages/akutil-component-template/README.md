# AkUtilComponentTemplate

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install akutil-component-template
```

## Using the component

### HTML

The `akutil-component-template` package exports the AkUtilComponentTemplate [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```
import AkUtilComponentTemplate from 'akutil-component-template';
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
  <akutil-component-template></akutil-component-template>
</body>
```

### React

```
import AkUtilComponentTemplate from 'akutil-component-template';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkUtilComponentTemplate, {});

ReactDOM.render(<ReactComponent />, container);
```
## AkUtilComponentTemplate API
* Properties

    *  [`akUtilComponentTemplate.name`](#AkUtilComponentTemplate+name) : string

* Methods

    *  [`akUtilComponentTemplate.announce()`](#AkUtilComponentTemplate+announce) ⇒ AkUtilComponentTemplate

* Events

    *  [`"announce-name"`](#AkUtilComponentTemplate+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import AkUtilComponentTemplate from 'akutil-component-template';
const component = new AkUtilComponentTemplate();
```
### `akUtilComponentTemplate.name` : string
The name of the AkUtilComponentTemplate element.

**Kind**: instance property of AkUtilComponentTemplate  
**Default**: `"AkUtilComponentTemplate"`  
### `akUtilComponentTemplate.announce()` ⇒ AkUtilComponentTemplate
Fire an event containing the name of the element.

**Kind**: instance method of AkUtilComponentTemplate  
**Returns**: AkUtilComponentTemplate - The AkUtilComponentTemplate element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by AkUtilComponentTemplate  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
