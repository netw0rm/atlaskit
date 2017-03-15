import { EditorTransform, ProseMirror } from '../../prosemirror';
import { isCodeBlockNode } from '../../schema';

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
  const tr = mergeClearContent(pm)
    .setNodeType(where, codeBlock, attrs);

  return tr;
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

function mergeClearContent(pm: ProseMirror) {
  const { tr } = pm;
  const { text } = pm.schema.nodes;
  const { from, to } = tr.selection;
  let textContent = '';
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock && node.textContent) {
      if (textContent.length > 0) {
        textContent += '\n';
      }
      textContent += node.textContent;
    }
  });
  const textNode = text.create({}, textContent);
  tr.replaceSelection(textNode);
  return tr;
}
