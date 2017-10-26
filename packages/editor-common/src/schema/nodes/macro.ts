import { NodeSpec, Node as PMNode } from 'prosemirror-model';

/**
 * @name macro_node
 */
export interface Definition {
  type: 'macro';
  attrs: {
    macroId: string;
    name: string;
    placeholderUrl: string;
    macroBodyHtml: string;
    params: object;
  };
}

export const macro: NodeSpec = {
  selectable: true,
  attrs: {
    macroId: { default: null },
    name: { default: null },
    placeholderUrl: { default: null },
    macroBodyHtml: { default: null },
    params: { default: null },
  },
  parseDOM: [{
    tag: 'span[data-node-type="macro"]',
    getAttrs: (dom: HTMLElement) => ({
      macroId: dom.getAttribute('data-macro-id'),
      name: dom.getAttribute('data-name'),
      placeholderUrl: dom.getAttribute('data-placeholder-url'),
      macroBodyHtml: dom.getAttribute('data-macro-body-html'),
      params: JSON.parse(dom.getAttribute('data-params') || '{}'),
    })
  }],
  toDOM(node: PMNode) {
    const { name, macroId, params, placeholderUrl, macroBodyHtml } = node.attrs;
    const attrs = {
      'data-node-type': 'macro',
      'data-macro-id': macroId,
      'data-name': name,
      'data-placeholder-url': placeholderUrl,
      'data-macro-body-html': macroBodyHtml,
      'data-params': JSON.stringify(params),
      'contenteditable': 'false',
    };

    if (macroBodyHtml) {
      return ['span', attrs, macroBodyHtml];
    }

    return ['span', attrs, ['img', {src: placeholderUrl}]];
  }
};
