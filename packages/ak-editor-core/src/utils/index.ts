import {
  EditorTransform,
  Node,
  NodeSelection,
  NodeType,
  ProseMirror,
  ResolvedPos,
  TextSelection,
  Selection
} from '../prosemirror';

function validateNode(node: Node): boolean {
  return false;
}

/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn't of the specified type
 */
export function isRangeOfType(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos, nodeType: NodeType): boolean {
  return getAncestorNodesBetween(pm, $from, $to).filter(node => node.type !== nodeType).length === 0;
}

/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a ordered_list with bullet_list.
 */
export function canJoinDown(pm: ProseMirror, selection: Selection, doc: any, nodeType: NodeType): boolean {
  const res = doc.resolve(selection.$to.after(findAncestorPosition(pm, selection.$to).depth));
  return res.nodeAfter && res.nodeAfter.type === nodeType;
}

/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a ordered_list with bullet_list.
 */
export function canJoinUp(pm: ProseMirror, selection: Selection, doc: any, nodeType: NodeType): boolean {
  const res = doc.resolve(selection.$from.before(findAncestorPosition(pm, selection.$from).depth));
  return res.nodeBefore && res.nodeBefore.type === nodeType;
}

/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
export function getAncestorNodesBetween(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos): Node[] {
  let nodes = Array<Node>();
  let maxDepth = findAncestorPosition(pm, $from).depth;
  let current = pm.doc.resolve($from.start(maxDepth));

  while (current.pos <= $to.start($to.depth)) {
    let depth = Math.min(current.depth, maxDepth);
    const node = current.node(depth);

    if (node) {
      nodes.push(node);
    }

    let next: ResolvedPos = pm.doc.resolve(current.after(depth));
    if (next.start(depth) >= pm.doc.nodeSize - 2) {
      break;
    }

    if (next.depth !== current.depth) {
      next = pm.doc.resolve(next.pos + 2);
    }

    if (next.depth) {
      current = pm.doc.resolve(next.start(next.depth));
    } else {
      current = pm.doc.resolve(next.end(next.depth));
    }
  }

  return nodes;
}

/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 * 
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 * 
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
export function getGroupsInRange(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos, isNodeValid: (node: Node) => boolean = validateNode): Array<{ $from: ResolvedPos, $to: ResolvedPos }> {
  const groups = Array<{ $from: ResolvedPos, $to: ResolvedPos }>();
  const commonAncestor = hasCommonAncestor(pm, $from, $to);
  const fromAncestor = findAncestorPosition(pm, $from);

  if (commonAncestor || (fromAncestor.depth === 1 && isNodeValid($from.node(1) !))) {
    groups.push({ $from, $to });
  } else {
    let current = $from;

    while (current.pos < $to.pos) {
      let ancestorPos = findAncestorPosition(pm, current);
      while (ancestorPos.depth > 1) {
        ancestorPos = findAncestorPosition(pm, ancestorPos);
      }

      const endPos = pm.doc.resolve(Math.min(
        // should not be smaller then start position in case of an empty paragpraph for example.
        Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 1),
        $to.pos
      ));

      groups.push({
        $from: current,
        $to: endPos
      });

      current = pm.doc.resolve(Math.min(endPos.after(1) + 1, pm.doc.nodeSize - 2));
    }
  }

  return groups;
}

/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
export function findAncestorPosition(pm: ProseMirror, pos: ResolvedPos): ResolvedPos {
  const nestableBlocks = ['blockquote', 'bullet_list', 'ordered_list'];

  if (pos.depth === 1) {
    return pos;
  }

  let node: Node | undefined = pos.node(pos.depth);
  while (pos.depth >= 1) {
    pos = pm.doc.resolve(pos.before(pos.depth));
    node = pos.node(pos.depth);

    if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
      break;
    }
  }

  return pos;
}

/**
 * Determine if two positions have a common ancestor.
 */
export function hasCommonAncestor(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos): boolean {
  let current;
  let target;

  if ($from.depth > $to.depth) {
    current = findAncestorPosition(pm, $from);
    target = findAncestorPosition(pm, $to);
  } else {
    current = findAncestorPosition(pm, $to);
    target = findAncestorPosition(pm, $from);
  }

  while (current.depth > target.depth && current.depth > 1) {
    current = findAncestorPosition(pm, current);
  }

  return current.node(current.depth) === target.node(target.depth);
}

/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
export function liftSelection(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos): EditorTransform {
  const { tr } = pm;
  let startPos = $from.start($from.depth);
  let endPos = $to.end($to.depth);
  let target = Math.max(0, findAncestorPosition(pm, $from).depth - 1);

  tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
    if (
      node.isText ||                          // Text node
      (node.isTextblock && !node.textContent) // Empty paragraph
    ) {
      const res = tr.doc.resolve(tr.map(pos));
      const sel = new NodeSelection(res);
      const range = sel.$from.blockRange(sel.$to);
      tr.lift(range, target);
    }
  });

  startPos = tr.map(startPos);
  endPos = tr.map(endPos);
  endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node

  tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));

  return tr;
}
