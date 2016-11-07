import { Block, Attribute, Node } from 'ak-editor-prosemirror';

interface EntityAttributes {
  params: Attribute
}

export class CodeBlockNodeType extends Block {
  get attrs():EntityAttributes {
    return  {
      params: new Attribute({ default : null})
    };
  }
  get isCode() { return true; }
  get matchDOMTag() { return { pre: [null, { preserveWhitespace: true }] }; }
  toDOM() { return ['pre', 0]; }
}

export interface CodeBlockNode extends Node {
	type: CodeBlockNodeType;
}