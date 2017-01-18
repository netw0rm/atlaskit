import { Attribute, Block, Node, Schema } from '../../prosemirror';

export class CodeBlockNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'code_block') {
      throw new Error('CodeBlockNodeType must be named "code_block".');
    }
  }

  get attrs() {
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
        if (parent) {
          language = extractLanguageFromClass(parent.className);
        }
        return [
          {
            'language': language
          },
          {
            preserveWhitespace: true
          }
        ] as any;
      }
    };
  }

  toDOM(): [string, number] {
    return ['pre', 0];
  }
}

const extractLanguageFromClass = (className: string) => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }

  return null;
};

export interface CodeBlockNode extends Node {
  type: CodeBlockNodeType;
  attrs: {
    language: string;
  };
}

export function isCodeBlockNode(node: Node): node is CodeBlockNode {
  return node.type instanceof CodeBlockNodeType;
}
