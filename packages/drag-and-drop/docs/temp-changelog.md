# Temporary change log
(the current changelog is broken)

## Changes
- feature: now supporting scrollable containers! (see docs for details)
- improvement: performance improvement due to usage of conditional disabling of pointer events
- improvement: improved support for dragging with a mouse and window scrolling
- fix: can no longer drag an item while returning to home
- improvement: item dragging with mouse now moves more naturally when scrolling the window
- limitation imposed: while dragging with a keyboard, if you scroll the window then the drag is canceled. This limitation can be removed in the future
- limitation imposed: keyboard dragging without a scrollable container will not allow the user to scroll beyond the visible edges. This limitation could be removed if we built auto scrolling lists.

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