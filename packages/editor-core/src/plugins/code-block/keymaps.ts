import { Schema, keymap, Plugin, EditorState } from '../../prosemirror';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  return keymap({
    'Enter': (state: EditorState<any>, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      const { $from, $to } = selection;
      const node = $from.node($from.depth);
      if (node &&
        node.type === nodes.codeBlock &&
        node.textContent.slice(node.textContent.length - 2) === '\n\n') {
          tr.delete($from.pos - 2, $from.pos);
          tr.split($from.pos - 2);
          tr.setBlockType($from.pos, $to.pos, nodes.paragraph);
          dispatch(tr);
          return true;
      }
      return false;
    },
    'Backspace': (state: EditorState<any>, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      if (!selection.empty || selection.from !== 1) {
        return false;
      }

      const { $anchor } = selection;
      const node = $anchor.node($anchor.depth);
      if (node &&
        node.type === nodes.codeBlock) {
          tr.setBlockType($anchor.pos, $anchor.pos, nodes.paragraph);
          dispatch(tr);
          return true;
      }
      return false;
    },
  });
}

export default keymapPlugin;
