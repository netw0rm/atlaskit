import { ProseMirror, Node, Mark, Slice, Fragment, Transform } from 'ak-editor-prosemirror';

function generateTextFromNode(previousValue: string, node: Node, currentIndex: number, { length }: Node[]): string {
  if (!node.text) {
    return previousValue;
  }

  const text = `${previousValue}${node.text}`;
  if (currentIndex === length - 1) {
    return text;
  } else {
    return `${text}\n`;
  }
}

function generateTextFromNodes(previousValue: string, node: Node, currentIndex: number, { length }: Node[]): string {
  // fallback to `node.text` if this is a text node
  const nodeText: string = node.content.content.reduce(generateTextFromNode, '') || node.text;

  const text = `${previousValue}${nodeText}`;
  if (currentIndex === length - 1) {
    return text;
  } else {
    return `${text}\n\n`;
  }
}

function isInCodeBlock(pm: ProseMirror): boolean {
  const node = pm.selection.$head.node(1);

  return node.type.name === 'code_block';
}

export function transformPasted(pm: ProseMirror, slice: Slice): Slice {
  if (isInCodeBlock(pm)) {
    const text: string = slice.content.content
      .reduce(generateTextFromNodes, '');

    let newNode = pm.schema.nodes.text.create({}, text.replace(/\u200c/g, '\n'));

    if (!slice.content.content[0].isText) {
      newNode = pm.schema.nodes.code_block.create({}, newNode);
    }

    const nodes = [newNode];

    return new Slice(Fragment.fromArray(nodes), 0, 0);
  }

  return slice;
}

export function transformPastedText(pm: ProseMirror, txt: string): string {
  if (isInCodeBlock(pm)) {
    return txt.replace(/\n/g, '\u200c');
  }

  return txt;
}

export function transformPastedHTML(pm: ProseMirror, html: string): string {
  if (isInCodeBlock(pm)) {
    return html.replace(/\n/g, '<br>').replace(/<br>/g, '\u200c');
  }

  return html;
}
