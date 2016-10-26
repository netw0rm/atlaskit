import { ProseMirror, Node, Mark, Slice, Fragment, Transform } from 'ak-editor-prosemirror';

function generateTextFromNode(pre: string, node: Node, currentIndex: number, { length }: Node[]): string {
  if (!node.text) {
    return pre;
  }

  const text = `${pre}${node.text}`;
  if (currentIndex === length - 1) {
    return text;
  } else {
    return `${text}\n`;
  }
}

function generateTextFromNodes(pre: string, node: Node, currentIndex: number, { length }: Node[]): string {
  // fallback to `node.text` if this is a text node
  const nodeText: string = node.content.content.reduce(generateTextFromNode, '') || node.text;

  const text = `${pre}${nodeText}`;
  if (currentIndex === length - 1) {
    return text;
  } else {
    return `${text}\n\n`;
  }
}

export default function(pm: ProseMirror, slice: Slice): Slice {
  debugger
  const node = pm.selection.$head.node(1);

  if (node.type.name === 'code_block') {
    const text: string = slice.content.content
      .reduce(generateTextFromNodes, '');

    let newNode = pm.schema.nodes.text.create({}, text);

    // TODO: pasting multiple lines doesn't work as expected
    // if pasting from code block, newlines from original block will disappear
    // if pasting from non code block, it will create another new code block
    if (slice.content.content[0].type.name !== 'text') {
      newNode = pm.schema.nodes.code_block.create({}, newNode);
    }

    const nodes = [newNode];

    return new Slice(Fragment.fromArray(nodes), 0, 0);
  }

  return slice;
}
