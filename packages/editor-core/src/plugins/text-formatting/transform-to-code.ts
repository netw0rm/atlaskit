import { Transaction, EditorState, ReplaceStep, Step } from '../../prosemirror';
import { createSliceWithContent } from '../../utils';

export function transformToCodeAction(state: EditorState<any>, from: number, to: number): Transaction {
  const replaceSteps: Step[] = [];
  const tr = state.tr;

  if (!state.selection) {
    return tr;
  }

  // Traverse through all the nodes within the range and replace them with their plaintext counterpart
  state.doc.nodesBetween(from, to, (node, nodePos) => {
    const cur = nodePos;
    const end = cur + node.nodeSize;
    if (node.type === state.schema.nodes.mention) {
      const content = node.attrs['displayName'];
      replaceSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, state), false));
    }
  });

  // Step from the end so that we don't have to recalculate the positions
  for (let i = replaceSteps.length - 1; i >= 0; i--) {
    tr.step(replaceSteps[i]);
  }

  return tr;
}
