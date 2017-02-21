# Group

Use this component in a dropdown list when you need to group relevant items together under the same heading

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### HTML

This package exports the @NAME@ React component.

Import the component in your React app as follows:

```js
import Item from '@atlaskit/droplist-item';
import Group from '@NAME@';

ReactDOM.render(<Group heading="Australia">
  <Item>Sydney</Item>
  <Item>Melbourne</Item>
  <Item>Canberra</Item>
</Group>, container);
```
