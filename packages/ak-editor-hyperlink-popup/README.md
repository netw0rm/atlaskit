
## Component API

* Properties

    *  [`hyperlinkPopup.open`](#HyperlinkPopup+open) : Boolean
    *  [`hyperlinkPopup.target`](#HyperlinkPopup+target) : String
    *  [`hyperlinkPopup.constrain`](#HyperlinkPopup+constrain) : String
    *  [`hyperlinkPopup.boxShadow`](#HyperlinkPopup+boxShadow) : String
    *  [`hyperlinkPopup.borderRadius`](#HyperlinkPopup+borderRadius) : String
    *  [`hyperlinkPopup.padding`](#HyperlinkPopup+padding) : String

### Constructor
The definition for the HyperlinkPopup component.

**HTML Example**
```js
<ak-editor-hyperlink-popup target="#target"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
import HyperlinkPopup from 'ak-editor-hyperlink-popup';
const myPopup = new HyperlinkPopup();
```
### `hyperlinkPopup.open` : Boolean
Controls visibility of an hyperlink-popup. Dialog is invisible by default.

**Kind**: instance property of HyperlinkPopup  
**Default**: `false`  
**HTML Example**
```js
<ak-editor-hyperlink-popup open></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.open = true;
```
### `hyperlinkPopup.target` : String
Target of an hyperlink-popup.
Selector or element on a page relative to which hyperlink-popup should be positioned

**Kind**: instance property of HyperlinkPopup  
**HTML Example**
```js
<ak-editor-hyperlink-popup target="#target"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.target = document.body.querySelector('#target');
```
**JS Example**
```js
dialog.target = '#target'
```
### `hyperlinkPopup.constrain` : String
Constrain an hyperlink-popup to a scrollable parent or the window

**Kind**: instance property of HyperlinkPopup  
**Default**: `'window'`  
**HTML Example**
```js
<ak-editor-hyperlink-popup constrain="scrollParent"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.constrain = 'scrollParent'
```
### `hyperlinkPopup.boxShadow` : String
Box-shadow style for the hyperlink-popup

**Kind**: instance property of HyperlinkPopup  
**HTML Example**
```js
<ak-editor-hyperlink-popup box-shadow="0 0 10px 10px #f0f0f0"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.boxShadow = '0 0 10px 10px #f0f0f0'
```
### `hyperlinkPopup.borderRadius` : String
Border-radius style for the hyperlink-popup

**Kind**: instance property of HyperlinkPopup  
**HTML Example**
```js
<ak-editor-hyperlink-popup border-radius="3px"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.borderRadius = '3px'
```
### `hyperlinkPopup.padding` : String
Padding style for the hyperlink-popup

**Kind**: instance property of HyperlinkPopup  
**HTML Example**
```js
<ak-editor-hyperlink-popup padding="3px"></ak-editor-hyperlink-popup>
```
**JS Example**
```js
dialog.padding = '3px'
```
