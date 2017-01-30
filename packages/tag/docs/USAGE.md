# Tag


This component is displayed as an accessible tag with an optional link and/or button to remove it.

![Example tags](https://i.imgur.com/UPtxaIM.png)

Although the `ak-tag` component can be used by itself, it works best in conjunction with the
[`ak-tag-group`](https://www.npmjs.com/package/ak-tag-group) component.

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).


## Installation

```sh
npm install @NAME@
```

## Using the component

The `ak-tag` package exports the Tag [React](https://facebook.github.io/react/) component.

```javascript
import ReactDOM from 'react-dom';
import Tag from '@NAME@';
ReactDOM.render(
  <Tag
    text="Jelly bean"
    removeButtonText="Come join us!"
  />,
  document.getElementById('root')
);
```
