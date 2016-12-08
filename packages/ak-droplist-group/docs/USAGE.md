# Group

Use this component in a dropdown list when you need to group relevant items together under the same heading

## Try it out

Interact with a [live demo of the ak-droplist-group component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-droplist-group/@VERSION@/).

## Installation

```sh
npm install ak-droplist-group --save
```

## Using the component

### HTML

This package exports the ak-droplist-group React component.

Import the component in your React app as follows:

```js
import Item from 'ak-droplist-item';
import Group from 'ak-droplist-group';

ReactDOM.render(<Group heading="Australia">
  <Item>Sydney</Item>
  <Item>Melbourne</Item>
  <Item>Canberra</Item>
</Group>, container);
```
