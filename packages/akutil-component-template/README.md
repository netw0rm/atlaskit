# MyComponent

## Synopsis

This is a template for AtlasKit components. Update this skeleton with Usage instructions.

## Setup and install

```
npm install ak-my-component
```

## Using the definition

The `ak-my-component` package also exports the [Skate](https://github.com/skatejs/skatejs) definition, 
which allows you to define your own components using the Avatar definition, e.g.:

```
import { define } from 'skatejs';
import definition from 'ak-my-component';

define('x-my-component', definition);
```
## Component API

* [MyComponent](#MyComponent)
    * [`new MyComponent()`](#new_MyComponent_new)

* Properties

    *  [`myComponent.myProperty`](#MyComponent+myProperty) : string

* Methods

    *  [`myComponent.myMethod()`](#MyComponent+myMethod) ⇒ MyComponent

* Events

    *  [`"my-event"`](#MyComponent+event_my-event)

### `new MyComponent()`
The definition for the component.

**HTML Example**
```js
<my-component></my-component>
```
**JS Example**
```js
import MyComponent from 'ak-component-name';
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

