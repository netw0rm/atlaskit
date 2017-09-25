import { NodeSpec, Node as PMNode } from '../../prosemirror';

export interface Definition {
  type: 'inlineMacro';
  attrs: {
    id: string;
    name: string;
    placeholderUrl: string;
    params: object;
  };
}

export const inlineMacro: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: null },
    name: { default: null },
    placeholderUrl: { default: null },
    params: { default: null },
  },
  parseDOM: [{
    tag: 'span[data-node-type="inlineMacro"]',
    getAttrs: (dom: HTMLElement) => ({
      id: dom.dataset.id,
      name: dom.dataset.name,
      placeholderUrl: dom.dataset.placeholderUrl,
      params: JSON.parse(dom.dataset.params || '{}'),
    })
  }],
  toDOM(node: PMNode) {
    const { name, id, params, placeholderUrl } = node.attrs;
    const attrs = {
      'data-node-type': 'inlineMacro',
      'data-id': id,
      'data-name': name,
      'data-placeholder-url': placeholderUrl,
      'data-params': JSON.stringify(params),
      'contenteditable': 'false',
    };
    return ['span', attrs, ['img', {src: placeholderUrl}]];
  }
};
