import { Block } from 'ak-editor-prosemirror';

export class CodeBlock extends Block {
  get isCode() { return true; }
  get matchDOMTag() { return { pre: [null, { preserveWhitespace: true }] }; }
  toDOM() { return ['pre', 0]; }
}
