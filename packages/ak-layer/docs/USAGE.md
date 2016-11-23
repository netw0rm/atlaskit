# Layer

The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relative to a target. You can specify up to 12 different positions.

If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will end up with a wrong position.

![Example Layer Components](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-layer/docs/Layer.png)

## Try it out

Interact with a [live demo of the ak-layer component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-layer/@VERSION@/).

## Installation

```sh
npm install ak-layer
```

## Using the component

### HTML

This package exports the ak-layer React component.

Import the component in your React app as follows:

```js
import Layer from 'ak-layer';

ReactDOM.render(<Layer position="right middle">
  <div>Some content</div>
  <div>I'm going to be aligned to the right!</div>
</Layer>, container);
```

The first child will be the element you are aligning to and the second is the content you want to align.


