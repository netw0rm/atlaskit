# Field

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the ak-field component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field/@VERSION@/).

## Installation

```sh
npm install ak-field
```

## Using the component

### HTML

The `ak-field` package exports the Field [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-field';
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
    <ak-field></ak-field>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import Field from 'ak-field';

const component = new Field();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Field from 'ak-field';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Field, {});

ReactDOM.render(<ReactComponent />, container);
```
