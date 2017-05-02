import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';

const nodeClassName = style({
  alignItems: 'center',
  background: akColorN30,
  border: `1px dashed ${akColorN50}`,
  borderRadius: akBorderRadius,
  boxSizing: 'border-box',
  cursor: 'default',
  display: 'inline-flex',
  fontSize: '13px',
  margin: '0 2px',
  minHeight: 24,
  padding: '0 10px',
  userSelect: 'all',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export default {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    const attrs = {
      'data-node-type': 'unsupportedInline',
      'class': nodeClassName,
      'data-unsupported': 'inline',
      'data-unsupported-inline-cxhtml': node.attrs['cxhtml'],
      'spellcheck': 'false',
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
