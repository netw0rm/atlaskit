import { MarkSpec } from '../../prosemirror';

/**
 * @name inline_comment_marker
 */
export interface Definition {
  type: 'inlineCommentMarker';
  attrs: {
    reference: string;
  };
}

export const inlineCommentMarker: MarkSpec = {
  inclusive: false,
  attrs: {
    reference: {
      default: ''
    }
  },
  parseDOM: [
    { tag: 'span[data-reference]' }
  ],
  toDOM(node): [string, any] {
    return ['span', {
      'data-reference': node.attrs.reference
    }];
  }
};
