import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';

import {
  NodeSpec,
} from '@atlaskit/editor-core';

import { style } from 'typestyle';

const nodeClassName = style({
  alignItems: 'center',
  background: akColorN30,
  border: `1px dashed ${akColorN50}`,
  borderRadius: akBorderRadius,
  boxSizing: 'border-box',
  cursor: 'default',
  display: 'block',
  fontSize: '13px',
  margin: '10px 0',
  minHeight: 24,
  padding: '10px',
  textAlign: 'center',
  userSelect: 'all',
  verticalAlign: 'text-bottom',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export default {
  group: 'block',
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    // NOTE: This node cannot be "contenteditable: false". If it's the only node in a document, PM throws an error because there's nowhere to put the cursor.
    const attrs = {
      'data-node-type': 'unsupportedBlock',
      'class': nodeClassName,
      'data-unsupported': 'block',
      'data-unsupported-block-cxhtml': node.attrs['cxhtml'],
      'spellcheck': 'false',
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
