
## Component API

* Properties

    *  [`popup.open`](#Popup+open) : Boolean
    *  [`popup.target`](#Popup+target) : String
    *  [`popup.constrain`](#Popup+constrain) : String
    *  [`popup.boxShadow`](#Popup+boxShadow) : String
    *  [`popup.borderRadius`](#Popup+borderRadius) : String
    *  [`popup.padding`](#Popup+padding) : String

### Constructor
The definition for the Popup component.

**HTML Example**
```js
<ak-editor-popup target="#target"></ak-editor-popup>
```
**JS Example**
```js
import Popup from 'ak-editor-popup';
const myPopup = new Popup();
```
### `popup.open` : Boolean
Controls visibility of an -popup. Dialog is invisible by default.

**Kind**: instance property of Popup  
**Default**: `false`  
**HTML Example**
```js
<ak-editor-popup open></ak-editor-popup>
```
**JS Example**
```js
dialog.open = true;
```
### `popup.target` : String
Target of an -popup.
Selector or element on a page relative to which -popup should be positioned

**Kind**: instance property of Popup  
**HTML Example**
```js
<ak-editor-popup target="#target"></ak-editor-popup>
```
**JS Example**
```js
dialog.target = document.body.querySelector('#target');
```
**JS Example**
```js
dialog.target = '#target'
```
### `popup.constrain` : String
Constrain an -popup to a scrollable parent or the window

**Kind**: instance property of Popup  
**Default**: `'window'`  
**HTML Example**
```js
<ak-editor-popup constrain="scrollParent"></ak-editor-popup>
```
**JS Example**
```js
dialog.constrain = 'scrollParent'
```
### `popup.boxShadow` : String
Box-shadow style for the -popup

**Kind**: instance property of Popup  
**HTML Example**
```js
<ak-editor-popup box-shadow="0 0 10px 10px #f0f0f0"></ak-editor-popup>
```
**JS Example**
```js
dialog.boxShadow = '0 0 10px 10px #f0f0f0'
```
### `popup.borderRadius` : String
Border-radius style for the -popup

**Kind**: instance property of Popup  
**HTML Example**
```js
<ak-editor-popup border-radius="3px"></ak-editor-popup>
```
**JS Example**
```js
dialog.borderRadius = '3px'
```
### `popup.padding` : String
Padding style for the -popup

**Kind**: instance property of Popup  
**HTML Example**
```js
<ak-editor-popup padding="3px"></ak-editor-popup>
```
**JS Example**
```js
dialog.padding = '3px'
```
