import schema from 'ak-editor-schema';
import { Node, Schema } from 'ak-editor-prosemirror';

export const fromHTML = (html: string, schema_: Schema = schema): Node => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return schema_.parseDOM(el)
}

export const toHTML = (node: Node): string => {
  const el = document.createElement('div');
  el.appendChild(node.toDOM());
  return el.innerHTML
}
