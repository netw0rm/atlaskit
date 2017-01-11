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
      'pre': (dom: HTMLElement) => {
        let language: string | null = null;
        const parent = dom.parentElement;
        if(parent) {
          language = extractLanguageFromClass(parent.className);
        }
        return [
          {
            'language': language
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

const extractLanguageFromClass = (className: string) => {
  const language_regex = /language-([^\s]+)/;
  const result = language_regex.exec(className);
  if(result && result[1]) {
    return result[1];
  }

  return null;
};

export interface CodeBlockNode extends Node {
  type: CodeBlockNodeType;
}

export function isCodeBlockNode(node: Node): node is CodeBlockNode {
  return node.type instanceof CodeBlockNodeType;
}
