
## Component API

* Properties

    *  [`popup.open`](#Popup+open) : Boolean
    *  [`popup.target`](#Popup+target) : String

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
