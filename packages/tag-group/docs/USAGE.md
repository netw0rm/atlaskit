# TagGroup

This component displays an arbitrary number of [`@atlaskit/tag`](https://www.npmjs.com/package/@atlaskit/tag)s
in a grouped manner.
The group manages spacing and animation direction and allows for some alignment options.

![Example tag group](https://i.imgur.com/A10xBnV.gif)

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@ ak-tag # @NAME@ has a peer dependency on ak-tag
```

## Using the component

This is a React component and can be used in the following way:

```js
import Tag from 'ak-tag';
import TagGroup from '@NAME@';

ReactDOM.render((
  <TagGroup>
    <Tag text="Cupcake" />
    <Tag text="Ice cream" />
    <Tag text="Chocolate" />
  </TagGroup>
), container);
```
