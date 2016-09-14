# Layer

The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relativo to a target. You can specify up to 12 diferent positions.

If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will endup with a wrong position.

## Setup and install
```
npm install ak-layer
```

## Using the component

The `ak-layer` package exports the Layer [skate](https://github.com/skatejs/skatejs) component:

```
import Layer from 'ak-layer';

const myLayer = new Layer();
```
