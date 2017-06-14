# Drag and Drop

[TODO: gif]

The goal of this library is to create a beautiful drag and drop experience for lists.

*Primary features*
- physics based movement
- keyboard first dragging
- simple and powerful api

## `dragDropContext`

In order to use drag and drop, you need to have the part of your react tree that you want to be able to use drag and drop in wrapped in a **drag drop context**. It is advised to just wrap your entire application in a **drag drop context**. Having multiple **drag drop context**'s is currently not supported. You will be able to achieve your desired conditional dragging and dropping using the `type` and `provide` functions of `droppable` and `draggable`.

### API
```js
dragDropContext(hooks?: Hooks)(Component: ReactClass<any>)

type Hooks = {
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd?: (result: DropResult) => void,
}
```

#### `Hooks`

**onDragStart**
This function will get notified when a drag starts. You are provided with the following details:

- `id: DraggableId`: the id of the draggable that is now dragging
- `location: DraggableLocation`: the location (`index` and `droppableId`) of where the dragging item has started.

```js
type DraggableId: string;

type DraggableLocation = {|
  droppableId: DroppableId,
  index: number
|};
```


**Basic usage**
```js
const App = () => <div>your app goes here</div>;

const ConnectedApp = dragDropContext()(App)

ReactDOM.render(<ConnectedApp />)
```

### `onDragStart`

### `onDragEnd`


## `droppable`

```js
const Droppable = droppable(type, axis, provide, mapStateToProps)(List);
```


```js
const Draggable = draggable(type, provide, mapStateToProps)(Item);
```

## Typed
Using flowtype

## Tested

## Performance
