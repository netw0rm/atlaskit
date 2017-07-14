import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';
import { moveLeft, atTheBeginningOfDoc } from '../../utils';

import { ProsemirrorGetPosHandler } from '../../nodeviews';

export const removeMediaNode = (view: EditorView, node: PMNode, getPos: ProsemirrorGetPosHandler) => {
  const { id } = node.attrs;
  const { state } = view;
  const { tr, selection, doc } = state;

  const currentMediaNodePos = getPos();
  tr.deleteRange(currentMediaNodePos, currentMediaNodePos + node.nodeSize);

  if (isTemporaryFile(id)) {
    tr.setMeta('addToHistory', false);
  }

  view.dispatch(tr);

  const $currentMediaNodePos = doc.resolve(currentMediaNodePos);
  const isLastMediaNode = $currentMediaNodePos.index() === $currentMediaNodePos.parent.childCount - 1;

  // If deleting a selected media node, we need to tell where the cursor to go next.
  // Prosemirror didn't gave us the behaviour of moving left if the media node is not the last one.
  // So we handle it ourselves.
  if (selection.from === currentMediaNodePos && !isLastMediaNode && !atTheBeginningOfDoc(state)) {
    moveLeft(view);
  }
};

const isTemporaryFile = (id: string): boolean => {
  return id.indexOf('temporary:') === 0;
};
