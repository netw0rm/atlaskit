# AkUtilComponentTemplate

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the akutil-component-template component](https://aui-cdn.atlassian.com/atlaskit/stories/akutil-component-template/@VERSION@/).

## Installation

```sh
npm install akutil-component-template
```

## Using the component

### HTML

The `akutil-component-template` package exports the AkUtilComponentTemplate [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'akutil-component-template';
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
    <akutil-component-template></akutil-component-template>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import AkUtilComponentTemplate from 'akutil-component-template';

const component = new AkUtilComponentTemplate();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import AkUtilComponentTemplate from 'akutil-component-template';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkUtilComponentTemplate, {});

ReactDOM.render(<ReactComponent />, container);
```
