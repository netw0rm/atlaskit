import { EditorState, Transaction } from '../prosemirror/future';
import * as baseCommand from '../prosemirror/future/prosemirror-commands/commands';

export * from '../prosemirror/future/prosemirror-commands/commands';

export function toggleCodeBlock() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.codeBlock) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.codeBlock));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}

export function toggleBulletList() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return toggleBlockquote()(state, dispatch);
  };
}

export function toggleOrderedList() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return true;
  };
}

export function splitListItem() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return true;
  };
}

export function setNormalText() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.paragraph) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
      return true;
    }

    return false;
  };
}

export function toggleBlockquote() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from} = state.selection;
    const potentialBlockquoteNode = $from.node($from.depth - 1);

    if (potentialBlockquoteNode && potentialBlockquoteNode.type === state.schema.nodes.blockquote) {
      return baseCommand.lift(state, dispatch);
    }

    return baseCommand.wrapIn(state.schema.nodes.blockquote)(state, dispatch);
  };
}

export function toggleHeading(level: number) {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.heading || currentBlock.attrs['level'] !== level) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.heading, { level }));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}
