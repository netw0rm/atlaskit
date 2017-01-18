import { Node, Schema } from '../';

export const fromHTML = (html: string, schema: Schema): Node => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return schema.parseDOM(el);
};

export const toHTML = (node: Node): string => {
  const el = document.createElement('div');
  el.appendChild(node.toDOM());
  return el.innerHTML;
};
