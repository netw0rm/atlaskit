import { MarkType, NodeType, ProseMirror } from '../';

export const commands: {
  chainCommands(...commands: ((_0: ProseMirror, _1?: boolean) => boolean)[]): (_0: ProseMirror, _1?: boolean) => boolean,
  deleteSelection(pm: ProseMirror, apply?: boolean): boolean,
  joinBackward(pm: ProseMirror, apply?: boolean): boolean,
  joinForward(pm: ProseMirror, apply?: boolean): boolean,
  deleteCharBefore(pm: ProseMirror, apply?: boolean): boolean,
  deleteWordBefore(pm: ProseMirror, apply?: boolean): boolean,
  deleteCharAfter(pm: ProseMirror, apply?: boolean): boolean,
  deleteWordAfter(pm: ProseMirror, apply?: boolean): boolean,
  joinUp(pm: ProseMirror, apply?: boolean): boolean,
  joinDown(pm: ProseMirror, apply?: boolean): boolean,
  lift(pm: ProseMirror, apply?: boolean): boolean,
  newlineInCode(pm: ProseMirror, apply?: boolean): boolean,
  createParagraphNear(pm: ProseMirror, apply?: boolean): boolean,
  liftEmptyBlock(pm: ProseMirror, apply?: boolean): boolean,
  splitBlock(pm: ProseMirror, apply?: boolean): boolean,
  selectParentNode(pm: ProseMirror, apply?: boolean): boolean,
  undo(pm: ProseMirror, apply?: boolean): boolean,
  redo(pm: ProseMirror, apply?: boolean): boolean,
  wrapIn(nodeType: NodeType, attrs?: { [key: string]: any }): (pm: ProseMirror, apply?: boolean) => boolean,
  setBlockType(nodeType: NodeType, attrs?: { [key: string]: any }): (pm: ProseMirror, apply?: boolean) => boolean,
  wrapInList(nodeType: NodeType, attrs?: { [key: string]: any }): (pm: ProseMirror, apply?: boolean) => boolean,
  splitListItem(nodeType: NodeType): (pm: ProseMirror) => boolean,
  liftListItem(nodeType: NodeType): (pm: ProseMirror, apply?: boolean) => boolean,
  sinkListItem(nodeType: NodeType): (pm: ProseMirror, apply?: boolean) => boolean,
  toggleMark(markType: MarkType, attrs?: { [key: string]: any }): (pm: ProseMirror, apply?: boolean) => boolean
};
