# ModalDialog

This component presents content in a layer above all other page content. The rest of the page cannot be interacted with until the modal dialog is closed.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-modal-dialog/docs/simple.png)

##Try it out

Interact with a [live demo of the ak-modal-dialog component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-modal-dialog/@VERSION@/).

## Installation

```sh
npm install ak-modal-dialog
```

## Using the component

### HTML

The `ak-modal-dialog` package exports the ModalDialog [Skate](https://github.com/skatejs/skatejs) component.

Each modal dialog has a `header` and `footer` slot which you can insert content into. The default slot is used for your main content (e.g. a `<form>` element). See below for a combined example with all three slots used.

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
    <ak-modal-dialog>
      <h2 slot="header">My heading</h2>
      <form id="my-form">
        <!-- form content... -->
      </form>
      <footer slot="footer">
        <ak-button appearance="primary" form="my-form">Create issue</ak-button>
      </footer>
    </ak-modal-dialog>
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
