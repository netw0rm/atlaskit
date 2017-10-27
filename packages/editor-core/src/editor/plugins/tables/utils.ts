import { EditorState } from 'prosemirror-state';
import { Node as PmNode } from 'prosemirror-model';
import { TableMap } from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';

export interface Cells {
  pos: number;
  node: PmNode;
}

export const getTableOffset = (state: EditorState): number => {
  const { $from } = state.selection;

  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);
    if(node.type === state.schema.nodes.table) {
      return $from.start(i);
    }
  }

  return 0;
};

export const getHoveredCells = (from: number, to: number, tableNode: PmNode, view: EditorView): Cells[] => {
  const map = TableMap.get(tableNode);
  const offset = getTableOffset(view.state);

  return map.cellsInRect(map.rectBetween(from, to)).map(cellPos => {
    const pos = cellPos + offset;
    const node = view.state.doc.nodeAt(pos)!;
    return { pos, node };
  });
};
