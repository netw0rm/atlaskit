import { Schema, keymap, Plugin, ResolvedPos } from '../../prosemirror';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const lastNodeIsHardBreak = ($from: ResolvedPos): boolean => {
    const node = $from.node($from.depth);
    return (!!node.lastChild && node.lastChild.type === schema.nodes.hardBreak);
  };

  const keymaps = {
    'Enter': (state: any, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      const { $from, $to } = selection;
      const range = $from.blockRange($to);
      const node = range && range.parent;
      if (node && node.type === nodes.panel) {
        if (lastNodeIsHardBreak($from)) {
          tr.split($from.pos);
          tr.delete($from.pos - 1, $from.pos);
          dispatch(tr);
        } else {
          const { hardBreak } = nodes;
          if (hardBreak) {
            const hardBreakNode = hardBreak.create();
            dispatch(state.tr.replaceSelectionWith(hardBreakNode));
            return true;
          }
        }
      }
      return false;
    }
  };

  return keymap(keymaps);
}

export default keymapPlugin;
