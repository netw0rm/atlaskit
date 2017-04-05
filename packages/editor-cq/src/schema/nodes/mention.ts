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
  attrs: {
    atlassianId: { default: null },
    user: { default: null },
  },
  toDOM(node): [string, any, string] {
    const attrs = {
      'class': nodeClassName,
      'data-mention-atlassian-id': node.attrs['atlassianId'],
      'data-mention-user': node.attrs['user'],
      'spellcheck': 'false',
    };
    return ['div', attrs, node.attrs['user'] || ''];
  },
  parseDOM: [
    {
      tag: 'div',
      getAttrs(dom: HTMLElement) {
        return {
          atlassianId: dom.getAttribute('data-mention-atlassian-id'),
          user: dom.getAttribute('data-mention-user'),
        };
      }
    }
  ]
} as NodeSpec;
