# Layer

The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relative to a target. You can specify up to 12 different positions.

If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will end up with a wrong position.

![Example of Layer](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-layer/docs/layer.png)

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

const myContent = (<div>I'm going to be aligned to the right!</div>);

ReactDOM.render(<Layer position="right middle" content={myContent}>
  <div>Some content</div>
</Layer>, container);
```

Any content that is passed to Layer as children will always be rendered and any content passed throught the `content` prop will be rendered aligned to the internal content.
