import schema from 'ak-editor-schema';
import { Node } from 'ak-editor-prosemirror';

export const fromHTML = (html: string): Node => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return schema.parseDOM(el)
}

export const toHTML = (node: Node): string => {
  const el = document.createElement('div');
  el.appendChild(node.toDOM());
  return el.innerHTML
}
