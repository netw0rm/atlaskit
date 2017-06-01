# Reordable API Proposal

## `dragDropContext`

```js
const Wrapped = dragDropContext(hooks)(Component)

export type Hooks = {|
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd?: (result: DragResult) => void,
|}
```

## `droppable`

```js
const Droppable = droppable(type, axis, provide, mapStateToProps)(List);
```

## `draggable`

```js
const Draggable = draggable(type, provide, mapStateToProps)(Item);
```

using `flow`
