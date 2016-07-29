# Blanket

## Setup and install

```
npm install ak-blanket
```

## Using the component

### HTML

The `ak-blanket` package exports the Blanket [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:
 
#### bundle.js

```
import 'ak-blanket';
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
  <ak-blanket></ak-blanket>
</body>
```

#### with other components

The main purpose of the blanket component is to provide the `overlay` layer for components such as `modal dialog` or `tooltip`. It can be achieved like this:

```
define('modal-dialog-component', () => {
 attached(elem) {
   window.addEventListener('ak-blanket-blur', doSomethingWhenBlanketClicked(elem));
 },
 detached(elem) {
   window.removeEventListener('ak-blanket-blur', doSomethingWhenBlanketClicked(elem));
 },
 render(elem) {
   return (
     <div>
       <ak-blanket clickable obscured />
       <div>the rest of the awesome component here</div>
     </div>
   );
 })
```

It emits the 'ak-blanket-blur' event when clicked/touched.
Blanket component doesn't have the z-index style, so make sure you put it into an appropriate DOM position.
For the purpose of simplicity blanket doesn't have any `show/hide` functionality. Since the main use of it suppose to be inside `popup` elements it would appear/disapper with the parent element.

### React

```
import Blanket from 'ak-blanket';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Blanket, {});

ReactDOM.render(<ReactComponent />, container);
```
## Component API

* Properties

    *  [`blanket.obscured`](#Blanket+obscured) : Boolean
    *  [`blanket.clickable`](#Blanket+clickable) : Boolean
    *  [`blanket.zIndex`](#Blanket+zIndex) : Number

### Constructor
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import Blanket from 'ak-blanket';
const component = new Blanket();
```
### `blanket.obscured` : Boolean
Is blanket grey with opacity or transparent. By default it's transparent.

**Kind**: instance property of Blanket  
**Default**: `false`  
**HTML Example**
```js
<ak-blanket obscure></ak-blanket>
```
**JS Example**
```js
component.obscure = true
```
### `blanket.clickable` : Boolean
If click on the blanket emits a 'blanket-click' event.

**Kind**: instance property of Blanket  
**Default**: `false`  
**HTML Example**
```js
<ak-blanket clickable></ak-blanket>
```
**JS Example**
```js
component.clickable = true
```
### `blanket.zIndex` : Number
z-index style for the blanket

**Kind**: instance property of Blanket  
**HTML Example**
```js
<ak-blanket z-index="9999"></ak-blanket>
```
**JS Example**
```js
component.zIndex = 9999
```
