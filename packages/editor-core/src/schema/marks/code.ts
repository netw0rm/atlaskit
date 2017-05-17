import { MarkSpec } from '../../prosemirror';

export const code: MarkSpec = {
  excludes: 'em strike strong underline emojiQuery mentionQuery textColor',
  inclusive: false,
  parseDOM: [
    { tag: 'code' },
    { tag: 'tt' },
    { style: 'font-family', getAttrs: value => value === 'monospace' && null },
    { style: 'white-space', getAttrs: value => value === 'pre' && null }
  ],
  toDOM(): [string, any] {
    return ['span', {
      style: 'font-family: monospace; white-space: pre-wrap;',
      class: 'code'
    }];
  }
};
