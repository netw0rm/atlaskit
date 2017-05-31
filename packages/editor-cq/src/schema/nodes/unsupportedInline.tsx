import { NodeSpec } from '@atlaskit/editor-core';

export default {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    const attrs = {
      'data-node-type': 'unsupportedInline',
      'data-unsupported': 'inline',
      'data-unsupported-inline-cxhtml': node.attrs['cxhtml'],
    };
    return ['div', attrs, 'Unsupported content'];
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="unsupportedInline"]',
      getAttrs(dom: HTMLElement) {
        return { cxhtml: dom.getAttribute('data-unsupported-inline-cxhtml')! };
      }
    }
  ]
} as NodeSpec;
