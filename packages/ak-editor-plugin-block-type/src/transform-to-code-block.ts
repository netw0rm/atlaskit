import { ProseMirror, ReplaceStep, Slice, RemoveMarkStep } from 'ak-editor-prosemirror';

// copied from prosemirror/src/commands/index.js
export default function(nodeType: any, pm: ProseMirror) {
  let {$from, $to, node} = pm.selection, depth
  if (node) {
    depth = $from.depth
  } else {
    if (!$from.depth || $to.pos > $from.end()) return false
    depth = $from.depth - 1
  }
  let target = node || $from.parent
  if (!target.isTextblock || target.hasMarkup(nodeType)) return false
  let index = $from.index(depth)
  if (!$from.node(depth).canReplaceWith(index, index + 1, nodeType)) return false

  let where = $from.before(depth + 1)
  clearMarkupFor(pm.tr, where, nodeType)
    .setNodeType(where, nodeType, {})
    .applyAndScroll()
  return true
}

// copied from prosemirror/src/transform/mark.js
function clearMarkupFor(tr: any, pos: any, newType: any) {
  let node = tr.doc.nodeAt(pos), match = newType.contentExpr.start()
  let delSteps = []
  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    let child = node.child(i), end = cur + child.nodeSize
    let allowed = match.matchType(child.type, child.attrs)
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end, Slice.empty))
    } else {
      match = allowed
      for (let j = 0; j < child.marks.length; j++) if (!match.allowsMark(child.marks[j]))
        tr.step(new RemoveMarkStep(cur, end, child.marks[j]))
    }
    cur = end
  }
  for (let i = delSteps.length - 1; i >= 0; i--) tr.step(delSteps[i])
  return tr
}
