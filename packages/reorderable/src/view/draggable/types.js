export type NeedsProviding = {|
  id: DraggableId,
  isDragEnabled?: boolean,
|}

export type Provide = (ownProps: Object) => NeedsProviding;
