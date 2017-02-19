type ProvidedDraggableState = {|
  id: ItemIdentifier,
  isDropEnabled ?: boolean
|}

type DraggableState = {|
  isDragging: boolean,
  getDragHandle: Function,
  // orderChange?
|}

type DraggableHooks = {|
  // ? needs to fire before isDropEnabled checks
  onDragStart: (id: ItemIdentifier) => void,
  onDragEnd: (id: ItemIdentifier) => void,
|}
