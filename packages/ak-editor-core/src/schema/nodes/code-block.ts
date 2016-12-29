import { Attribute, Block, Node, Schema } from '../../prosemirror';

export interface EntityAttributes {
  language: Attribute;
}

export class CodeBlockNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'code_block') {
      throw new Error('CodeBlockNodeType must be named "code_block".');
    }
  }

  get attrs(): EntityAttributes {
    return {
      language: new Attribute({ default: null })
    };
  }

  get isCode() {
    return true;
  }

  get matchDOMTag() {
    return {
      'pre': (dom: Element) => {
        return [
          {
            'language': dom.getAttribute('data-lang'),
          },
          {
            preserveWhitespace: true
          }
        ];
      }
    };
  }

  toDOM() {
    return ['pre', 0];
  }
}

export interface CodeBlockNode extends Node {
  type: CodeBlockNodeType;
}

export function isCodeBlockNode(node: Node): node is CodeBlockNode {
  return node.type instanceof CodeBlockNodeType;
}
