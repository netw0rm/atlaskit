import { NodeSpec } from '../../prosemirror';

export const codemirror: NodeSpec = {
  content: 'block+',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{
    tag: 'div[class*="CodeMirror"]'
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': 'CodeMirror'
    };
    return ['div', attrs, node.attrs.text];
  }
};
