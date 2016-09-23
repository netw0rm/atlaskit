# Inline Dialog

The Inline Dialog is a container for secondary content and controls that are displayed on user request.

![Example tags](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-inline_dialog/docs/inline_dialog.gif)

## Try it out

Interact with a [live demo of the ak-inline-dialog component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-inline-dialog/@VERSION@/).

## Installation

```sh
npm install ak-inline-dialog
```

## Using the definition

### HTML

The `ak-inline-dialog` package exports the InlineDialog [skate](https://github.com/skatejs/skatejs) component:

#### bundle.js

```javascript
import InlineDialog from 'ak-inline-dialog';

const myDialog = new InlineDialog();
```
Now you can use the defined inline dialog in your HTML markup:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-inline-dialog></ak-inline-dialog>
</body>
```
### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```
import AkInlineDialog from 'ak-inline-dialog';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(AkInlineDialog, {});

ReactDOM.render(<ReactComponent />, container);
```