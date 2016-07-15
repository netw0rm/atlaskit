# MyComponent

## Synopsis

This is a template for AtlasKit components. Update this skeleton with Usage instructions.

## Setup and install

```
npm install my-component
```

## Using the definition

The `ak-my-component` package exports the MyComponent [Skate](https://github.com/skatejs/skatejs) component.

```
import MyComponent from 'my-component';

const myComponent = new MyComponent();
```
## Component API

* Properties

    *  [`myComponent.myProperty`](#MyComponent+myProperty) : string

* Methods

    *  [`myComponent.myMethod()`](#MyComponent+myMethod) ⇒ MyComponent

* Events

    *  [`"my-event"`](#MyComponent+event_my-event)

### Constructor
Define a component using the exported definition.

You may then create instances of the component programatically, or using markup.

**JS Example**
```js
import MyComponent from 'ak-my-component';
const myComponent = new MyComponent();
```
### `myComponent.myProperty` : string
Description of myProperty

**Kind**: instance property of MyComponent  
### `myComponent.myMethod()` ⇒ MyComponent
Description for myMethod method.

**Kind**: instance method of MyComponent  
**Returns**: MyComponent - The MyComponent element.  
**Emits**: my-event  
**JS Example**
```js
myComponent.myMethod(); // Fires the my-event event.
```
### `"my-event"`
Description of 'my-event'

**Kind**: event emitted by MyComponent  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.tag | String | The tagName of the component. |

