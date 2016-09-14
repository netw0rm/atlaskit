# Blanket

## Setup and install

```sh
npm install ak-blanket
```

## Using the component

### HTML

The `ak-blanket` package exports the Blanket [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-blanket';
```

Now we can use the defined tag in our HTML markup, e.g.:

#### index.html

```html
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

```js
define('modal-dialog-component', () => {
 attached(elem) {
   window.addEventListener('activate', doSomethingWhenBlanketClicked(elem));
 },
 detached(elem) {
   window.removeEventListener('activate', doSomethingWhenBlanketClicked(elem));
 },
 render(elem) {
   return (
     <div>
       <ak-blanket clickable tinted />
       <div>the rest of the awesome component here</div>
     </div>
   );
 })
```

It emits the 'activate' event when clicked/touched.
Blanket component doesn't have the z-index style, so make sure you put it into an appropriate DOM position.
For the purpose of simplicity blanket doesn't have any `show/hide` functionality. Since the main use of it suppose to be inside `popup` elements it would appear/disapper with the parent element.

### React

```js
import Blanket from 'ak-blanket';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Blanket, {});

ReactDOM.render(<ReactComponent />, container);
```
