import { EditorView, keymap, Plugin, Node } from '../../prosemirror';

let plugin: Plugin | undefined;

export function keymapPlugin(view: EditorView): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const checkEndPanelBlock = (): boolean => {
    const { state: { selection, schema: { nodes } } } = view;
    const { $from, $to } = selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    if (node && node.type === nodes.panel) {
      const { state: { tr } , dispatch } = view;
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
  };

  const lastCharIsNewline = (node: Node): boolean => {
    if (node && node.textContent) {
      return node.textContent.slice(-1) === '\n';
    }
    return false;
  };

  const keymaps = {
    ['Enter']: checkEndPanelBlock,
  };

  plugin = keymap(keymaps);
  return plugin;
}

export default keymapPlugin;
