import { Fragment, NodeSelection, ProseMirror, RemoveMarkStep, ReplaceStep, Slice, Step } from '../../prosemirror';
import { CodeBlockNodeType, HardBreakNodeType, MentionNodeType } from '../../schema';

// copied from prosemirror/src/commands/index.js
export default function transform(nodeType: CodeBlockNodeType, pm: ProseMirror) {
  const node = pm.selection instanceof NodeSelection ? pm.selection.node : null;
  const { $from, $to } = pm.selection;
  let depth;
  if (node) {
    depth = $from.depth;
  } else {
    if (!$from.depth || $to.pos > $from.end()) {
      return false;
    }
    depth = $from.depth - 1;
  }
  const target = node || $from.parent;
  if (!target.isTextblock || target.hasMarkup(nodeType)) {
    return false;
  }
  const index = $from.index(depth);
  if (!$from.node(depth) !.canReplaceWith(index, index + 1, nodeType)) {
    return false;
  }

  const where = $from.before(depth + 1);
  clearMarkupFor(pm, where, nodeType)
    .setNodeType(where, nodeType, {})
    .applyAndScroll();
  return true;
}

// copied from prosemirror/src/transform/mark.js
function clearMarkupFor(pm: ProseMirror, pos: number, newType: CodeBlockNodeType) {
  const tr = pm.tr;
  const node = tr.doc.nodeAt(pos) !;
  let match = (newType as any).contentExpr.start();
  const delSteps: Step[] = [];
  const inserts: {pos: number, content: string, deleted: number}[] = [];
  let deleted = 0;
  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    const child = node.child(i);
    const end = cur + child.nodeSize;

    const allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      if (child.type instanceof HardBreakNodeType) {
        delSteps.push(new ReplaceStep(cur, end, new Slice(new Fragment([pm.schema.nodes.text.create(null, '\n')], 1), 0, 0)));
      } else {
        if (child.type instanceof MentionNodeType) {
          inserts.push({pos: cur, content: child.attrs['displayName'], deleted: deleted});
        }
        deleted = deleted + 1;
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

  let previousInsertLength = 0;

  inserts.forEach((insert) => {
    const {pos, content, deleted} = insert;
    tr.insertText(pos + previousInsertLength - deleted, content);
    previousInsertLength = previousInsertLength + content.length ;
  });

  return tr;
}
