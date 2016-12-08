# TagGroup

This component displays an arbitrary number of [`ak-tag`](https://www.npmjs.com/package/ak-tag)s
in a grouped manner.
The group manages spacing and animation direction and allows for some alignment options.

![Example tag group](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-tag-group/docs/animation.gif)

## Try it out

Interact with a [live demo of the ak-tag-group component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-tag-group/@VERSION@/).

## Installation

```sh
npm install ak-tag ak-tag-group # ak-tag-group has a peer dependency on ak-tag
```

## Using the component

This is a React component and can be used in the following way:

```js
import Tag from 'ak-tag';
import TagGroup from 'ak-tag-group';

ReactDOM.render((
  <TagGroup>
    <Tag text="Cupcake" />
    <Tag text="Ice cream" />
    <Tag text="Chocolate" />
  </TagGroup>
), container);
```
