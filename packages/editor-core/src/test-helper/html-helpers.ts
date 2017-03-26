import { dom, Schema, Node, NodeSpec, MarkSpec, DOMSerializer, DOMParser } from '../';

export const fromHTML = (html: string, schema: Schema<NodeSpec, MarkSpec>): Node => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return DOMParser.fromSchema(schema).parse(el);
};

export const toDOM = (node: Node, schema: Schema<NodeSpec, MarkSpec>): dom.Node => {
  const serializer = DOMSerializer.fromSchema(schema);
  return serializer.serializeNodeAndMarks(node);
};

export const toHTML = (node: Node, schema: Schema<NodeSpec, MarkSpec>): string => {
  const el = document.createElement('div');
  el.appendChild(toDOM(node, schema));
  return el.innerHTML;
};
