import type { CurrentDrag, Dimension } from '../../types';

export type MapProps = {|
  dimension: ?Dimension,
  currentDrag: ?CurrentDrag,
|}

export type ConnectedProps = {|
  itemId: DraggableId,
|}
