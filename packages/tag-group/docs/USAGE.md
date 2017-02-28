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

<a name="TagGroup"></a>

## TagGroup
**Kind**: global class
* Properties

    *  [tagGroup.alignment](#TagGroup+alignment) : <code>alignment</code>

<a name="new_TagGroup_new"></a>

### new TagGroup()
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import TagGroup from 'ak-tag-group';
import Tag from 'ak-tag';

ReactDOM.render(
  <TagGroup>
    <Tag text="Cupcake" href="http://www.cupcakeipsum.com/" />
  </TagGroup>, container);
```
<a name="TagGroup+alignment"></a>

### tagGroup.alignment : <code>alignment</code>
(Optional) A group alignment.

Defaults to an empty string (which means it uses the text direction to determine
the alignment (same as start)).

This setting also controls the animation direction on tag removal,
e.g. start alignment means that the tags list moves to the text-start on removal
end alignment means it moves to the text-end (all based on the text direction,
e.g. start alignment in LTR means the tags move to the right, start alignment
in RTL means the tags move to the left).

**Kind**: instance property of <code>[TagGroup](#TagGroup)</code>
**Default**: <code>start</code>
**JS Example**
```js
import TagGroup from 'ak-tag-group';
import Tag from 'ak-tag';
ReactDOM.render(
  <TagGroup alignment="end">
    <Tag text="Cupcake" />
    <Tag text="Chocolate" />
  </TagGroup>, container);
```
