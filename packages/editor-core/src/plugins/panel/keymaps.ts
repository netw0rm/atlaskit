import { Schema, keymap, Plugin, Node } from '../../prosemirror';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const lastCharIsNewline = (node: Node): boolean => {
    if (node && node.textContent) {
      return node.textContent.slice(-1) === '\n';
    }
    return false;
  };

  const keymaps = {
    'Enter': (state: any, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      const { $from, $to } = selection;
      const range = $from.blockRange($to);
      const node = range && range.parent;
      if (node && node.type === nodes.panel) {
        if (lastCharIsNewline(node)) {
          tr.split($from.pos);
          tr.delete($from.pos - 1, $from.pos);
          dispatch(tr);
        } else {
          dispatch(tr.insertText('\n'));
          return true;
        }
      }
      return false;
    }
  };

  return keymap(keymaps);
}

export default keymapPlugin;
