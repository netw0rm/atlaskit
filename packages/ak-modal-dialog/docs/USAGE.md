# ModalDialog

This is a template for AtlasKit components. Update this file with usage instructions and examples.


![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-componentname/docs/insertyourimagehere.png)

##Try it out

Interact with a [live demo of the ak-modal-dialog component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-modal-dialog/@VERSION@/).

## Installation

```sh
npm install ak-modal-dialog
```

## Using the component

### HTML

The `ak-modal-dialog` package exports the ModalDialog [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-modal-dialog';
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
    <ak-modal-dialog></ak-modal-dialog>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import ModalDialog from 'ak-modal-dialog';

const component = new ModalDialog();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import ModalDialog from 'ak-modal-dialog';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ModalDialog, {});

ReactDOM.render(<ReactComponent />, container);
```
