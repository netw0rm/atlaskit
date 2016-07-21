# Inline Dialog

## Synopsis

A container for secondary content/controls to be displayed on user request.

## Setup and install

```
npm install ak-inline-dialog
```

## Using the definition

The `ak-inline-dialog` package exports the InlineDialog [skate](https://github.com/skatejs/skatejs) component:

```
import InlineDialog from 'ak-inline-dialog';

const myDialog = new InlineDialog();
```
## Component API

* Properties

    *  [`inlineDialog.position`](#InlineDialog+position) : string
    *  [`inlineDialog.open`](#InlineDialog+open) : Boolean
    *  [`inlineDialog.target`](#InlineDialog+target) : String
    *  [`inlineDialog.constrain`](#InlineDialog+constrain) : String
    *  [`inlineDialog.boxShadow`](#InlineDialog+boxShadow) : String
    *  [`inlineDialog.borderRadius`](#InlineDialog+borderRadius) : String
    *  [`inlineDialog.padding`](#InlineDialog+padding) : String

### Constructor
The definition for the InlineDialog component.

**HTML Example**
```js
<ak-inline-dialog target="#target"></ak-inline-dialog>
```
**JS Example**
```js
import InlineDialog from 'ak-inline-dialog';
const myDialog = new InlineDialog();
```
### `inlineDialog.position` : string
Position of an inline-dialog relative to it's target. One of:

|             | top left    | top center    | top right    |              |
| --- | ---| --- |
| left top    |             |               |              | right top    |
| left middle |             |               |              | right middle |
| left bottom |             |               |              | right bottom |
|             | bottom left | bottom center | bottom right |              |

**Kind**: instance property of InlineDialog  
**Default**: `"right middle"`  
**HTML Example**
```js
<ak-inline-dialog position="top left"></ak-inline-dialog>
```
**JS Example**
```js
dialog.position = 'top left';
```
### `inlineDialog.open` : Boolean
Controls visibility of an inline-dialog. Dialog is invisible by default.

**Kind**: instance property of InlineDialog  
**Default**: `false`  
**HTML Example**
```js
<ak-inline-dialog open></ak-inline-dialog>
```
**JS Example**
```js
dialog.open = true;
```
### `inlineDialog.target` : String
Target of an inline-dialog.
Selector or element on a page relative to which inline-dialog should be positioned

**Kind**: instance property of InlineDialog  
**HTML Example**
```js
<ak-inline-dialog target="#target"></ak-inline-dialog>
```
**JS Example**
```js
dialog.target = document.body.querySelector('#target');
```
**JS Example**
```js
dialog.target = '#target'
```
### `inlineDialog.constrain` : String
Constrain an inline-dialog to a scrollable parent or the window

**Kind**: instance property of InlineDialog  
**Default**: `'window'`  
**HTML Example**
```js
<ak-inline-dialog constrain="scrollParent"></ak-inline-dialog>
```
**JS Example**
```js
dialog.constrain = 'scrollParent'
```
### `inlineDialog.boxShadow` : String
Box-shadow style for the inline-dialog

**Kind**: instance property of InlineDialog  
**HTML Example**
```js
<ak-inline-dialog box-shadow="0 0 10px 10px #f0f0f0"></ak-inline-dialog>
```
**JS Example**
```js
dialog.boxShadow = '0 0 10px 10px #f0f0f0'
```
### `inlineDialog.borderRadius` : String
Border-radius style for the inline-dialog

**Kind**: instance property of InlineDialog  
**HTML Example**
```js
<ak-inline-dialog border-radius="3px"></ak-inline-dialog>
```
**JS Example**
```js
dialog.borderRadius = '3px'
```
### `inlineDialog.padding` : String
Padding style for the inline-dialog

**Kind**: instance property of InlineDialog  
**HTML Example**
```js
<ak-inline-dialog padding="3px"></ak-inline-dialog>
```
**JS Example**
```js
dialog.padding = '3px'
```
