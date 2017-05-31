# Reordable API Proposal

## `dragDropContext`

```js
const Connected = dragDropContext(hooks)(Component)

export type Hooks = {|
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd?: (result: DragResult) => void,
|}
```

## `droppable`

```js
const Droppable = droppable(type, axis, provide, mapStateToProps)(Component);
```

## `draggable`

```js
const Draggable = draggable(type, provide, mapStateToProps)(Component);
```

using `flow`
