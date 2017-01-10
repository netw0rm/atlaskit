# ModalDialog

This component displays content in a layer that sits above the rest of the page content. Users won't be able to interact with the page until the dialog is closed.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-modal-dialog/docs/simple.png)

##Try it out

Interact with a [live demo of the ak-modal-dialog component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-modal-dialog/@VERSION@/).

## Installation

```sh
npm install ak-modal-dialog
```

## Using the component

This package exports the `ak-button` React component.

Import the component in your React app as follows:

```js
import ModalDialog from 'ak-modal-dialog';
ReactDOM.render(
  <ModalDialog
    open
    header={
      <h2>Modal header</h2>
    }
    footer={
      <p>Modal footer</p>
    }
  >
    <p>Modal body goes here</p>
  </ModalDialog>
, container);
```
