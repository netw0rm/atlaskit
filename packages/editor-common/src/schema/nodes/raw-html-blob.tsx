import { NodeSpec, Node as PMNode } from 'prosemirror-model';

/**
 * @name rawHtmlBlob_node
 */
export interface Definition {
  type: 'rawHtmlBlob';
  attrs: {
    html: string
  }
};

export const rawHtmlBlob: NodeSpec = {
  inline: true,
  attrs: {
    html: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-node-type="htmlBlob"]',
    getAttrs: (dom: HTMLElement) => ({
      html: dom.innerHTML,
    })
  }],
  toDOM(node: PMNode) {
    const { html } = node.attrs;

    return ['span', {}, html];
  }
};
