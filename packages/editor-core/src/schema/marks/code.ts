import { MarkSpec } from '../../prosemirror';
import { FONT_STYLE, LINK, SEARCH_QUERY } from '../groups';

export const code: MarkSpec = {
  excludes: `${FONT_STYLE} ${LINK} ${SEARCH_QUERY}`,
  inclusive: true,
  parseDOM: [
    { tag: 'code', preserveWhitespace: true },
    { tag: 'tt', preserveWhitespace: true },
    {
      style: 'font-family',
      preserveWhitespace: true,
      getAttrs: (value: string) => (value.toLowerCase().indexOf('monospace') > -1) && null,
    },
    { style: 'white-space',
      preserveWhitespace: true,
      getAttrs: value => value === 'pre' && null
    },
  ],
  toDOM(): [string, any] {
    return ['span', {
      style: 'font-family: monospace; white-space: pre-wrap;',
      class: 'code'
    }];
  }
};
