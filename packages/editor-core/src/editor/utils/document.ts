import { Node } from '../../prosemirror';

/**
 * Checks if node is an empty paragraph.
 */
export function isEmptyParagraph(node?: Node): boolean {
  return !node || (node.type.name === 'paragraph' && !node.textContent);
}

/**
 * Checks if a node has any significant content.
 */
export function isEmpty(node?: Node): boolean {
  if (node && node.textContent) {
    return false;
  }

  if (!node
    || !node.childCount
    || (node.childCount === 1 && isEmptyParagraph(node.firstChild))) {
    return true;
  }

  const block: Node[] = [];
  const nonBlock: Node[] = [];

  node.forEach(child => {
    child.isInline
      ? nonBlock.push(child)
      : block.push(child);
  });

  return !nonBlock.length
    && !block.filter(childNode =>
        !!childNode.childCount && !(childNode.childCount === 1 && isEmptyParagraph(childNode.firstChild))).length;
}
