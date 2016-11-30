# Item

This is a basic building block of a dropdown's list. Use it if you want to build your own version of a droppable component with list of items.


![Example ak-droplist-item](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-droplist-item/docs/screencast.gif)

## Try it out

Interact with a [live demo of the ak-droplist-item component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-droplist-item/@VERSION@/).

## Installation

```sh
npm install ak-droplist-item --save
```

## Using the component

### HTML

This package exports the ak-droplist-item React component.

Import the component in your React app as follows:

```js
import Item from 'ak-droplist-item';

ReactDOM.render(<Item>Some awesome text</Item>, container);
```

Any content that is passed to Layer as children will always be rendered and any content passed throught the `content` prop will be rendered aligned to the internal content.
