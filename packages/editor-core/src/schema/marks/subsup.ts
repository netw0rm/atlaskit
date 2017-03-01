import { MarkSpec } from '../../prosemirror';

export const subsup: MarkSpec = {
  get inclusiveRight() {
    return true;
  },
  attrs: {type: {default: 'sub'}},
  parseDOM: [
    {tag: 'sub', attrs: {type: 'sub'}},
    {tag: 'sup', attrs: {type: 'sup'}}
  ],
  toDOM(node: any) { return [node.attrs.type]; }
};
