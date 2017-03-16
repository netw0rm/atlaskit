import { EditorTransform, Fragment, ProseMirror, RemoveMarkStep, ReplaceStep, Slice, Step, TextSelection } from '../../prosemirror';
import { isCodeBlockNode, isHardBreakNode, isMentionNode } from '../../schema';

export default function transformToCodeBlock(pm: ProseMirror): void {
  if (!isConvertableToCodeBlock(pm)) {
    return;
  }

  transformToCodeBlockAction(pm).applyAndScroll();
}

export function transformToCodeBlockAction(pm: ProseMirror, attrs?: any): EditorTransform {
  const { $from } = pm.selection;
  const codeBlock = pm.schema.nodes.code_block;

  const where = $from.before($from.depth);
  const tr = clearMarkupFor(pm, where);
  return mergeContent(tr, pm.schema.nodes)
    .setNodeType(where, codeBlock, attrs);
}

export function isConvertableToCodeBlock(pm: ProseMirror): boolean {
  // Before a document is loaded, there is no selection.
  if (!pm.selection) {
    return false;
  }

  const { $from } = pm.selection;
  const node = $from.parent;

  if (!node.isTextblock || isCodeBlockNode(node)) {
    return false;
  }

  const parentDepth = $from.depth - 1;
  const parentNode = $from.node(parentDepth);
  const index = $from.index(parentDepth);

  return parentNode.canReplaceWith(index, index + 1, pm.schema.nodes.code_block);
}

function createSliceWithContent(content: string, pm: ProseMirror) {
 return new Slice(Fragment.from(pm.schema.nodes.text.create(null, content)), 0, 0);
}

function clearMarkupFor(pm: ProseMirror, pos: number) {
  const tr = pm.tr;
  const node = tr.doc.nodeAt(pos)!;
  let match = pm.schema.nodes.code_block.contentExpr.start();
  const delSteps: Step[] = [];

  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    const child = node.child(i);
    const end = cur + child.nodeSize;

    const allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      if (isMentionNode(child)) {
        const content = child.attrs['displayName'];
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, pm)));
      } else if (isHardBreakNode(child)) {
        const content = '\n';
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, pm)));
      } else {
        delSteps.push(new ReplaceStep(cur, end, Slice.empty));
      }
    } else {
      match = allowed;
      for (let j = 0; j < child.marks.length; j++) {
        if (!match.allowsMark(child.marks[j])) {
          tr.step(new RemoveMarkStep(cur, end, child.marks[j]));
        }
      }
    }
    cur = end;
  }

  for (let i = delSteps.length - 1; i >= 0; i--) {
    tr.step(delSteps[i]);
  }

  return tr;
}

function mergeContent(tr: EditorTransform, nodes: any) {
  const { text } = nodes;
  const { from, to, $from, $to } = tr.selection;
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
    const textNode = text.create({}, textContent);
    tr.setSelection(new TextSelection(tr.doc.resolve($from.start(1)), tr.doc.resolve($to.end(1))));
    tr.replaceSelection(textNode);
  }
  return tr;
}
