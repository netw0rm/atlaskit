# Temporary change log
(the current changelog is broken)

### Feature changes and improvements
- now supporting scrollable containers! (see docs for details)
- performance improvement due to usage of conditional disabling of pointer events
- improved support for dragging with a mouse and window scrolling
- scrolling the window while keyboard dragging will now cancel a drag (see docs)
- slightly faster physics animations

```js
type Provided = {|
  innerRef: (HTMLElement) => void,
  // values have changed
  draggableStyle: ?DraggableStyle,
  dragHandleProps: ?DragHandleProvided,
  placeholder: ?ReactElement,
|}
```

**Old dragging style**

```js
type DraggableStyle = DraggingStyle | NotDraggingStyle;

type DraggingStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
  transform: ?string,
|}

type NotDraggingStyle = {|
  transition: ?string,
  transform: ?string,
|}
```

**New dragging style**

```js
type DraggableStyle = DraggingStyle | NotDraggingStyle;

type DraggingStyle = {|
  position: 'fixed',
  boxSizing: 'border-box',
  // allow scrolling of the element behind the dragging element
  pointerEvents: 'none',
  zIndex: ZIndex,
  width: number,
  height: number,
  top: number,
  left: number,
  transform: ?string,
|}

type NotDraggingStyle = {|
  transition: ?string,
  transform: ?string,
  pointerEvents: 'none' | 'auto',
|}
```

### Technical changes
- now using position: fixed rather than position: absolute for positioning a draggable item
- blocking pointer events when appropriate while dragging to allow scrolling on containers while dragging (and for performance butter)
- droppable dimension now needs to be aware of its current scroll (this is now listened to within droppable-dimension-publisher)
- a draggable knows what droppable it is in by using context rather than its page coordinates (this is really important when you have more than one droppable. It is the best way to know what a draggables parent is)
- sinon+chai => jest
- previously draggable and droppable shared a 'dimension' type. However, they are just becoming too different and forcing them to share was proving to be a lot of trouble and misdirection. Now they are seperate things and they also have their own dimension publishers
draggables will now 'move' based on a window scroll or container scroll