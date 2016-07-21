# Layer

## Synopsis

A container responsible for the positioning of an element on a page

## Setup and install

```
npm install ak-layer
```

## Using the definition

The `ak-layer` package exports the Layer [skate](https://github.com/skatejs/skatejs) component:

```
import Layer from 'ak-layer';

const myLayer = new Layer();
```
## Component API

* Properties

    *  [`layer.position`](#Layer+position) : string
    *  [`layer.constrain`](#Layer+constrain) : String
    *  [`layer.target`](#Layer+target) : String

### Constructor
The definition for the Layer component.

**HTML Example**
```js
<ak-layer target="#target"></ak-layer>
```
**JS Example**
```js
import Layer from 'ak-layer';
const myLayer = new Layer();
```
### `layer.position` : string
Position of an layer relative to it's target. One of:
|             | top left    | top center    | top right    |              |
|-------------|-------------|---------------|--------------|--------------|
| left top    |             |               |              | right top    |
| left middle |             |               |              | right middle |
| left bottom |             |               |              | right bottom |
|-------------|-------------|---------------|--------------|--------------|
|             | bottom left | bottom center | bottom right |              |

**Kind**: instance property of Layer  
**Default**: `"right middle"`  
**HTML Example**
```js
<ak-layer position="top left"></ak-layer>
```
**JS Example**
```js
layer.position = 'top left';
```
### `layer.constrain` : String
Constrain a layer to a scrollable parent or the window

**Kind**: instance property of Layer  
**Default**: `'window'`  
**HTML Example**
```js
<ak-layer constrain="scrollParent"></ak-layer>
```
**JS Example**
```js
layer.constrain = 'scrollParent'
```
### `layer.target` : String
Target of a layer.
Selector or element on a page relative to which layer should be positioned

**Kind**: instance property of Layer  
**HTML Example**
```js
<ak-layer target="#target"></ak-layer>
```
**JS Example**
```js
layer.target = document.body.querySelector('#target');
```
**JS Example**
```js
layer.target = '#target'
```
