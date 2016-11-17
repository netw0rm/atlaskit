import { ProseMirror, ReplaceStep, Slice, RemoveMarkStep } from 'ak-editor-prosemirror';

// copied from prosemirror/src/commands/index.js
export default function(nodeType: any, pm: ProseMirror) {
  let {$from, $to, node} = pm.selection;
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
  if (!$from.node(depth).canReplaceWith(index, index + 1, nodeType)) {
    return false;
  }

  const where = $from.before(depth + 1);
  clearMarkupFor(pm.tr, where, nodeType)
    .setNodeType(where, nodeType, {})
    .applyAndScroll();
  return true;
}

// copied from prosemirror/src/transform/mark.js
function clearMarkupFor(tr: any, pos: any, newType: any) {
  const node = tr.doc.nodeAt(pos);
  let match = newType.contentExpr.start();
  const delSteps = [];
  const newlinePos = [];
  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    const child = node.child(i), end = cur + child.nodeSize;

    if (child.type.name === 'hard_break') {
      newlinePos.push(cur);
    }

    const allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end, Slice.empty));
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

  newlinePos.forEach((pos) => {
    tr.insertText(pos, '\n');
  });

  return tr;
}
