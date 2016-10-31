import { ProseMirror, Node as PMNode, Mark, Slice, Fragment, Transform } from 'ak-editor-prosemirror';

function generateTextFromNode(previousValue: string, node: PMNode, currentIndex: number, { length }: PMNode[]): string {
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

function generateTextFromNodes(previousValue: string, node: PMNode, currentIndex: number, { length }: PMNode[]): string {
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

const inlineElements = [
  'b',
  'big',
  'i',
  'small',
  'tt',
  'abbr',
  'acronym',
  'cite',
  'code',
  'dfn',
  'em',
  'kbd',
  'strong',
  'samp',
  'time',
  'var',
  'a',
  'bdo',
  'br',
  'img',
  'map',
  'object',
  'q',
  'script',
  'span',
  'sub',
  'sup',
  'button',
  'input',
  'label',
  'select',
  'textarea',
];

function isInline(node: any): boolean {
  while (node) {
    if (node.style) {
      if (node.style.display === 'inline' || node.style.display === 'inline-block') {
        return true;
      }

      if (node.style.display) {
        return false;
      }
    }

    if (node.tagName) {
      for (let i = 0; i < inlineElements.length; i++) {
        if (node.tagName.toLowerCase() === inlineElements[i]) {
          return true;
        }
      }
    }

    node = node.parentNode;
  }

  return false;
}

function getTextFromNode(node: any): string {
  let result = '';

  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];

    if (child.nodeType === 1) {
      result += getTextFromNode(child);
    } else if (child.nodeType === 3) {
      result += child.nodeValue;
      if (!isInline(child)) {
        result += '\u200c';
        if (child === node.lastChild) {
          result += '\u200c';
        }
      }
    }
  }

  return result;
}

function replaceWithZWNJ(html: string): string {
  const node = document.createElement('div');
  node.innerHTML = html;
  return getTextFromNode(node).replace(/\u200c\u200c$/, '').replace(/\n|<br>/g, '\u200c');
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
    return replaceWithZWNJ(html);
  }

  return html;
}
