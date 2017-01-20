import { EditorTransform, Fragment, NodeSelection, ProseMirror, RemoveMarkStep, ReplaceStep, Slice, Step } from '../../prosemirror';
import { CodeBlockNodeType, HardBreakNodeType, MentionNodeType } from '../../schema';

// copied from prosemirror/src/commands/index.js
export default function transform(nodeType: CodeBlockNodeType, pm: ProseMirror, markdownDecorator?: string) {
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
  const tr = clearMarkupFor(pm, where, nodeType)
    .setNodeType(where, nodeType, {});

  removeDecorator(tr, where, markdownDecorator);
  tr.applyAndScroll();
  return true;
}

function removeDecorator(tr: EditorTransform, pos: number, markdownDecorator: string | undefined) {
  if (markdownDecorator) {
    tr.delete(pos + 1, pos + markdownDecorator.length + 1);
  }
}

// copied from prosemirror/src/transform/mark.js
function clearMarkupFor(pm: ProseMirror, pos: number, newType: CodeBlockNodeType) {
  const tr = pm.tr;
  const node = tr.doc.nodeAt(pos) !;
  let match = (newType as any).contentExpr.start();
  const delSteps: Step[] = [];

  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    const child = node.child(i);
    const end = cur + child.nodeSize;

    const allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      if (child.type instanceof MentionNodeType) {
        const content = child.attrs['displayName'];
        delSteps.push(new ReplaceStep(cur, end, new Slice(Fragment.from(pm.schema.nodes.text.create(null, content)), 0, 0)));
      } else if (child.type instanceof HardBreakNodeType) {
        const content = '\n';
        delSteps.push(new ReplaceStep(cur, end, new Slice(Fragment.from(pm.schema.nodes.text.create(null, content)), 0, 0)));
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
