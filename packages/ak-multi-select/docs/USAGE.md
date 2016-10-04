# MultiSelect

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the ak-multi-select component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-multi-select/@VERSION@/).

## Installation

```sh
npm install ak-multi-select
```

## Using the component

### HTML

The `ak-multi-select` package exports the MultiSelect [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-multi-select';
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
    <ak-multi-select></ak-multi-select>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import MultiSelect from 'ak-multi-select';

const component = new MultiSelect();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import MultiSelect from 'ak-multi-select';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(MultiSelect, {});

ReactDOM.render(<ReactComponent />, container);
```
