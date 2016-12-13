# Radio

Provides a standard way to select a single option from a list.


## Try it out

Interact with a [live demo of the ak-field-radio component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field-radio/@VERSION@/).

## Installation

```sh
npm install ak-field-radio
```

## Using the component

### HTML

The `ak-field-radio` package exports the FieldRadio [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-field-radio';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-field-radio></ak-field-radio>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import FieldRadio from 'ak-field-radio';

const component = new FieldRadio();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import FieldRadio from 'ak-field-radio';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(FieldRadio, {});

ReactDOM.render(<ReactComponent />, container);
```
