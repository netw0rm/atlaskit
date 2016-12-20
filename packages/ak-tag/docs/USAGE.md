# Tag


This component is displayed as an accessible tag with an optional link and/or button to remove it.

![Example tags](http://i.imgur.com/UPtxaIM.png)

Although the `ak-tag` component can be used by itself, it works best in conjunction with the
[`ak-tag-group`](https://www.npmjs.com/package/ak-tag-group) component.

## Try it out

Interact with a [live demo of the ak-tag component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/ak-tag/@VERSION@/).


## Installation

```sh
npm install ak-tag --save
```

## Using the component

The `ak-tag` package exports the Tag [React](https://facebook.github.io/react/) component.

```javascript
import ReactDOM from 'react-dom';
import Tag from 'ak-tag';
ReactDOM.render(
  <Tag
    text="Jelly bean"
    removeButtonText="Come join us!"
  />,
  document.getElementById('root')
);
```
