import { NodeSpec } from '@atlaskit/editor-core';

export default {
  group: 'block',
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    // NOTE: This node cannot be "contenteditable: false". If it's the only node in a document, PM throws an error because there's nowhere to put the cursor.
    const attrs = {
      'data-node-type': 'unsupportedBlock',
      'data-unsupported': 'block',
      'data-unsupported-block-cxhtml': node.attrs['cxhtml'],
    };
    return ['div', attrs, 'Unsupported content'];
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="unsupportedBlock"]',
      getAttrs(dom: HTMLElement) {
        return { cxhtml: dom.getAttribute('data-unsupported-block-cxhtml')! };
      }
    }
  ]
} as NodeSpec;
