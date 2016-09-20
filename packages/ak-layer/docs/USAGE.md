# Layer

The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relative to a target. You can specify up to 12 different positions.

If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will end up with a wrong position.

## Try it out

Interact with a [live demo of the ak-layer component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-layer/).

## Installation

```sh
npm install ak-layer
```

## Using the component

### HTML

The `ak-layer` package exports the Layer [skate](https://github.com/skatejs/skatejs) component:

Import the component in your JS resource:
 
#### bundle.js

```js
import Layer from 'ak-layer';

const myLayer = new Layer();
```
Now you can use the defined layer in your HTML markup:

#### index.html

```
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-layer></ak-layer>
</body>
```
### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).


```
import Layer from 'ak-layer';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Layer, {});

ReactDOM.render(<ReactComponent />, container);
```




