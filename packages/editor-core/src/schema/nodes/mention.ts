import {
  akColorN30,
  akColorN50,
  akColorN500
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import { NodeSpec, Node } from '../../prosemirror';

const mentionStyle = style({
  background: akColorN30,
  borderRadius: '20px',
  color: akColorN500,
  padding: '0 4px 2px 3px',
  userSelect: 'all',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export interface MentionNode extends Node {
  attrs: {
    id: string;
    displayName: string;
  };
}

export const mention: NodeSpec = {
  group: 'inline',
  attrs: {
    id: { default: '' },
    displayName: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      displayName: dom.textContent!
    })
  }],
  toDOM(node: Node): [string, any, string] {
    const mentionNode = node as MentionNode;
    const attrs = {
      'class': mentionStyle,
      'mention-id': mentionNode.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, mentionNode.attrs.displayName];
  }
};
