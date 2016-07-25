# Tag

## Synopsis

This is a template for AtlasKit components. Update this file with usage instructions and examples.

## Setup and install

```
npm install ak-tag
```

## Using the component

### HTML

The `ak-tag` package exports the Tag [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import Tag from 'ak-tag';
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
  <ak-tag></ak-tag>
</body>
```

### React

```
import Tag from 'ak-tag';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Tag, {});

ReactDOM.render(<ReactComponent />, container);
```
## Component API

* Properties

    *  [`tag.name`](#Tag+name) : string

* Methods

    *  [`tag.announce()`](#Tag+announce) ⇒ Tag

* Events

    *  [`"announce-name"`](#Tag+event_announce-name)

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import Tag from 'ak-tag';
const component = new Tag();
```
### `tag.name` : string
The name of the Tag element.

**Kind**: instance property of Tag  
**Default**: `"Tag"`  
### `tag.announce()` ⇒ Tag
Fire an event containing the name of the element.

**Kind**: instance method of Tag  
**Returns**: Tag - The Tag element.  
**Emits**: announce-name  
**JS Example**
```js
component.announce(); // Fires the announce-name event.
```
### `"announce-name"`
Fired when the `announce` method is called.

**Kind**: event emitted by Tag  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the component. |
