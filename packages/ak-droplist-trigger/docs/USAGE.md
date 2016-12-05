# Trigger

This is one of the building blocks of dropdowns. Click or press on it activates it.

## Try it out

Interact with a [live demo of the ak-droplist-trigger component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-droplist-trigger/@VERSION@/).

## Installation

```sh
npm install ak-droplist-trigger --save
```

## Using the component

### HTML

This package exports the ak-droplist-trigger React component.

Import the component in your React app as follows:

```js
import Trigger from 'ak-droplist-trigger';

const callback = () => {
  // all the action should be happening in this callback
}

ReactDOM.render(<Trigger onActivate={callback}>Some awesome text</Trigger>, container);
```
