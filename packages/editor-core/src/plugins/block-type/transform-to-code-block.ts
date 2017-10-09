import { Transaction, EditorState, RemoveMarkStep, ReplaceStep, Slice, Step, Fragment } from '../../prosemirror';
import { createSliceWithContent } from '../../utils';

export default function transformToCodeBlock(state: EditorState<any>): void {
  if (!isConvertableToCodeBlock(state)) {
    return;
  }

  transformToCodeBlockAction(state).scrollIntoView();
}

export function transformToCodeBlockAction(state: EditorState<any>, attrs?: any): Transaction {
  const { $from } = state.selection;
  const codeBlock = state.schema.nodes.codeBlock;

  const where = $from.before($from.depth);
  const tr = clearMarkupFor(state, where);
  return mergeContent(tr, state)
    .setNodeType(where, codeBlock, attrs);
}

export function isConvertableToCodeBlock(state: EditorState<any>): boolean {
  // Before a document is loaded, there is no selection.
  if (!state.selection) {
    return false;
  }

  const { $from } = state.selection;
  const node = $from.parent;

  if (!node.isTextblock || node.type === state.schema.nodes.codeBlock) {
    return false;
  }

  const parentDepth = $from.depth - 1;
  const parentNode = $from.node(parentDepth);
  const index = $from.index(parentDepth);

  return parentNode.canReplaceWith(index, index + 1, state.schema.nodes.codeBlock);
}

function clearMarkupFor(state: EditorState<any>, pos: number): Transaction {
  const tr = state.tr;
  const node = tr.doc.nodeAt(pos)!;
  const { codeBlock } = state.schema.nodes;
  let match = codeBlock.contentMatch;
  let delSteps: Step[] = [];
  let cur = pos + 1;

  for (let i = 0; i < node.childCount; i++) {
    let child = node.child(i);
    let end = cur + child.nodeSize;
    let allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      if (child.type === state.schema.nodes.mention) {
        const content = child.attrs['text'];
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, state)));
      } else if (child.type === state.schema.nodes.rule || child.type === state.schema.nodes.hardBreak) {
        const content = '\n';
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, state)));
      } else {
        delSteps.push(new ReplaceStep(cur, end, Slice.empty));
      }
    } else {
      match = allowed;
      for (let j = 0; j < child.marks.length; j++) {
        if (!codeBlock.allowsMarkType(child.marks[j].type)) {
          tr.step(new RemoveMarkStep(cur, end, child.marks[j]));
        }
      }
    }
    cur = end;
  }
  if (!match.validEnd) {
    let fill = match.fillBefore(Fragment.empty, true);
    tr.replace(cur, cur, new Slice(fill, 0, 0));
  }
  for (let i = delSteps.length - 1; i >= 0; i--) {
    tr.step(delSteps[i]);
  }

  return tr;
}

function mergeContent(tr: Transaction, state: EditorState<any>) {
  const { from, to, empty } = tr.selection;
  if (empty) {
    return tr;
  }
  let textContent = '';
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock && node.textContent) {
      if (textContent.length > 0) {
        textContent += '\n';
      }
      textContent += node.textContent;
    }
  });
  if (textContent.length > 0) {
    const textNode = state.schema.text(textContent);
    tr.replaceSelectionWith(textNode);
  }
  return tr;
}
