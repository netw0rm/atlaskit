import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const pluginKey = new PluginKey('tableHoverSelectionPlugin');

const hoverSelectionPlugin = new Plugin({
  state: {
    init: () => DecorationSet.empty,

    apply(tr, set): DecorationSet {
      // adjust decoration positions to changes made by the transaction
      set = set.map(tr.mapping, tr.doc);

      const meta = tr.getMeta(pluginKey);
      if (meta && meta.cells) {
        const deco = meta.cells.map(cell => {
          return Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, { class: 'hoveredCell' });
        });
        set = set.add(tr.doc, deco);
      } else {
        set = DecorationSet.empty;
      }

      return set;
    }
  },
  key: pluginKey,
  props: {
    decorations: state => pluginKey.getState(state)
  }
});

export default hoverSelectionPlugin;
