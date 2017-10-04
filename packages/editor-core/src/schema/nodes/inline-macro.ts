import { NodeSpec, Node as PMNode } from '../../prosemirror';

export interface Definition {
  type: 'inlineMacro';
  attrs: {
    macroId: string;
    name: string;
    placeholderUrl: string;
    params: object;
  };
}

export const inlineMacro: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    macroId: { default: null },
    name: { default: null },
    placeholderUrl: { default: null },
    params: { default: null },
  },
  parseDOM: [{
    tag: 'span[data-node-type="inlineMacro"]',
    getAttrs: (dom: HTMLElement) => ({
      macroId: dom.dataset.macroId,
      name: dom.dataset.name,
      placeholderUrl: dom.dataset.placeholderUrl,
      params: JSON.parse(dom.dataset.params || '{}'),
    })
  }],
  toDOM(node: PMNode) {
    const { name, macroId, params, placeholderUrl } = node.attrs;
    const attrs = {
      'data-node-type': 'inlineMacro',
      'data-macro-id': macroId,
      'data-name': name,
      'data-placeholder-url': placeholderUrl,
      'data-params': JSON.stringify(params),
      'contenteditable': 'false',
    };
    return ['span', attrs, ['img', {src: placeholderUrl}]];
  }
};
