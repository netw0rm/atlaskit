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
        const language = getLanguageFromEditorStyle(dom) || getLanguageFromBitbucketStyle(dom);

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

  toDOM(node: CodeBlockNode) {
    return ['pre', {'data-language': node.attrs.language}, 0];
  }
}

// example of BB style:
// <div class="codehilite language-javascript"><pre><span>hello world</span><span>\n</span></pre></div>
const getLanguageFromBitbucketStyle = (dom: HTMLElement): string | null => {
  const parent = dom.parentElement;

  if(parent && parent.className.indexOf('codehilite') !== -1) {
    removeLastNewLine(dom);
    return extractLanguageFromClass(parent.className);
  }
  return null;
};

const removeLastNewLine = (dom: HTMLElement): void => {
  dom.textContent = dom.textContent!.replace(/\n$/, '');
};

const getLanguageFromEditorStyle = (dom: HTMLElement): string | null => {
  return dom.dataset['language'] || null;
};

const extractLanguageFromClass = (className: string): string | null => {
  const language_regex = /(?:^|\s)language-([^\s]+)/;
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
