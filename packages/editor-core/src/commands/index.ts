import { EditorState, liftTarget, Transaction } from '../prosemirror';
import * as baseCommand from '../prosemirror/prosemirror-commands';
import * as baseListCommand from '../prosemirror/prosemirror-schema-list';

export * from '../prosemirror/prosemirror-commands';

export function toggleBulletList() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const grandgrandParent = $from.node(-2);
    if (grandgrandParent && grandgrandParent.type === state.schema.nodes.bullet_list) {
      return liftListItem()(state, dispatch);
    } else {
      return baseListCommand.wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
    }
  };
}

export function toggleOrderedList() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const grandgrandParent = $from.node(-2);
    if (grandgrandParent && grandgrandParent.type === state.schema.nodes.ordered_list) {
      return liftListItem()(state, dispatch);
    } else {
      return baseListCommand.wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
    }
  };
}

export function splitListItem() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return baseListCommand.splitListItem(state.schema.nodes.list_item)(state, dispatch);
  };
}

export function liftListItem() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { $from, $to } = state.selection;
    let { list_item, paragraph } = state.schema.nodes;
    let range = $from.blockRange($to, (node) => {
      if (node && node.firstChild) {
        return node.type === list_item && node.firstChild.type === paragraph;
      }
      return false;
    });

    if (!range) {
      return false;
    }

    const target = range && liftTarget(range);

    if (target === undefined) {
      return false;
    }

    dispatch(state.tr.lift(range, target));

    return true;
  };
}

export function toggleCodeBlock() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.codeBlock) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.codeBlock));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}

export function setNormalText() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
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
    const { $from } = state.selection;
    const potentialBlockquoteNode = $from.node($from.depth - 1);

    if (potentialBlockquoteNode && potentialBlockquoteNode.type === state.schema.nodes.blockquote) {
      return baseCommand.lift(state, dispatch);
    }

    return baseCommand.wrapIn(state.schema.nodes.blockquote)(state, dispatch);
  };
}

export function togglePanel() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const potentialPanelNode = $from.node($from.depth - 1);

    if (potentialPanelNode && potentialPanelNode.type === state.schema.nodes.blockquote) {
      return baseCommand.lift(state, dispatch);
    }

    return baseCommand.wrapIn(state.schema.nodes.panel)(state, dispatch);
  };
}

export function toggleHeading(level: number) {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.heading || currentBlock.attrs['level'] !== level) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.heading, { level }));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}
