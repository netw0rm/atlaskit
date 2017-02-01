import { EditorState, Transaction } from '../prosemirror/future';
import * as baseCommand from '../prosemirror/future/prosemirror-commands/commands';

export * from '../prosemirror/future/prosemirror-commands/commands';

export function toggleCodeBlock() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    if ($from.parent.type !== state.schema.nodes.codeBlock) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.codeBlock));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}

export function toggleBlockquote() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    if ($from.parent.type !== state.schema.nodes.blockquote) {
      return baseCommand.wrapIn(state.schema.nodes.blockquote)(state, dispatch);
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
      return true;
    }
  };
}

export function toggleHeading(level: number) {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    if ($from.parent.type !== state.schema.nodes.heading) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.heading, { level }));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}
