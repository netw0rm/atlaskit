import { EditorTransform, ProseMirror, ReplaceStep, Step } from '../../prosemirror';
import { isMentionNode } from '../../schema';
import { createSliceWithContent } from '../../utils';

export function transformToCodeAction(pm: ProseMirror, from: number, to: number): EditorTransform {
  const replaceSteps: Step[] = [];
  const tr = pm.tr;

  if (!pm.selection) {
    return tr;
  }

  // Traverse through all the nodes within the range and replace them with their plaintext counterpart
  pm.doc.nodesBetween(from, to, (node, nodePos) => {
    const cur = nodePos;
    const end = cur + node.nodeSize;
    if (isMentionNode(node)) {
      const content = node.attrs['displayName'];
      replaceSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, pm)));
    }
  });

  // Step from the end so that we don't have to recalculate the positions
  for (let i = replaceSteps.length - 1; i >= 0; i--) {
    tr.step(replaceSteps[i]);
  }

  // Apply to get the new selection after the transformation
  tr.apply();

  // Clear all marks (strong, strike, etc.)
  pm.tr.clearMarkup(from, pm.selection.to).apply();
  return pm.tr;
}
