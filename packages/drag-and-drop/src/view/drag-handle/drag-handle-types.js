import type { Position } from '../../types';

export type DragTypes = 'KEYBOARD' | 'MOUSE';

export type Callbacks = {
  onLift: (point: Position) => void,
  onKeyLift: () => void,
  onMove: (point: Position) => void,
  onMoveForward: () => void,
  onMoveBackward: () => void,
  onDrop: () => void,
  onCancel: () => void,
}

export type Provided = {
  onMouseDown: (event: MouseEvent) => void,
  onKeyDown: (event: KeyboardEvent) => void,
  onClick: (event: MouseEvent) => void,
  tabIndex: number,
  'aria-grabbed': 'true' | 'false',
  draggable: boolean,
  onDragStart: () => void,
  onDrop: () => void
}
