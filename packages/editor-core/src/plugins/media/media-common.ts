import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';
import { setNodeSelection } from '../../utils';

import { ProsemirrorGetPosHandler } from '../../nodeviews';

export const handleMediaNodeRemoval = (view: EditorView, node: PMNode, getPos: ProsemirrorGetPosHandler) => {
  const { id } = node.attrs;
  const { tr } = view.state;

  const nodePos = getPos();
  tr.deleteRange(nodePos, nodePos + node.nodeSize);

  if (isTemporaryFile(id)) {
    tr.setMeta('addToHistory', false);
  }
  view.dispatch(tr);

  setSelectionAfterRemoval(view, nodePos);
};

const setSelectionAfterRemoval = (view: EditorView, currentPos: number): void => {
  const { doc, schema } = view.state;
  const $previousMediaNodePos = doc.resolve(currentPos - 1);
  const previousMediaNode = $previousMediaNodePos.nodeAfter;

  if (previousMediaNode) {
    // Only set selection to previous media node if there is one
    if (previousMediaNode.type === schema.nodes.media) {
      setNodeSelection(view, $previousMediaNodePos.pos);
    }
  }
};

const isTemporaryFile = (id: string): boolean => {
  return id.indexOf('temporary:') === 0;
};
