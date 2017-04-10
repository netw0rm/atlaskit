import { EditorView, keymap, Plugin, Node, EditorState, Transaction, TextSelection } from '../../prosemirror';

import * as keymaps from '../../keymaps';

let plugin: Plugin | undefined;

export function keymapPlugin(view: EditorView): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const list = {};

  const checkEndPanelBlock = (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const { selection, schema: { nodes } } = state;
    const { $from, $to } = selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    if (node && node.type === nodes.panel) {
      let { tr } = view.state;
      if (lastParagraphHasContent($from.node($from.depth))) {
        tr = tr.split($from.pos);
        tr = tr.setSelection(new TextSelection(
          tr.doc.resolve(tr.mapping.map($from.pos)),
          tr.doc.resolve(tr.mapping.map(($to.pos)))
        ));
        // const sel = new TextSelection(
        //   tr.doc.resolve(tr.mapping.map($from.pos)),
        //   tr.doc.resolve(tr.mapping.map(($to.pos)))
        // );
        // console.log('**', sel.$from.depth, sel.$from.node(sel.$from.depth))
        dispatch(tr);
        return true;
      }
    }
    return false;
  };

  const lastParagraphHasContent = (node: Node): boolean => {
    return node && !!node.textContent;
  };

  keymaps.bindKeymapWithCommand(keymaps.enter.common!!, checkEndPanelBlock, list);

  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;
