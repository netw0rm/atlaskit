# Validator

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the ak-validator component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-validator/@VERSION@/).

## Installation

```sh
npm install ak-validator
```

## Using the component

### HTML

The `ak-validator` package exports the Validator [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-validator';
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
    <ak-validator></ak-validator>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import Validator from 'ak-validator';

const component = new Validator();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Validator from 'ak-validator';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Validator, {});

ReactDOM.render(<ReactComponent />, container);
```
