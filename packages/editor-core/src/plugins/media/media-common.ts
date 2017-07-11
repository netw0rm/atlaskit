
import {
  EditorView,
  NodeSelection,
} from '../../prosemirror';
import * as commands from '../../commands';

export const splitMediaGroup = (view: EditorView): boolean => {
  const { selection } = view.state;

  // if selection is not a media node, do nothing.
  if (!(selection instanceof NodeSelection) || selection.node.type !== view.state.schema.nodes.media) {
    return false;
  }

  commands.deleteSelection(view.state, view.dispatch);

  // if selected media node is the last one, no need to insert a new p or split the block, prosemirror handled it.
  if (selection.$to.nodeAfter) {
    commands.splitBlock(view.state, view.dispatch);
    commands.createParagraphNear(view, false);
  }

  return true;
};
