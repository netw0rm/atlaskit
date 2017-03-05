import { Attribute, Block, browser, Node, Schema } from '../../prosemirror';

export class CodeBlockNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'code_block') {
      throw new Error('CodeBlockNodeType must be named "code_block".');
    }
  }

  get attrs() {
    return {
      language: new Attribute({default: null})
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
        ] as any;
      }
    };
  }

  toDOM(node: CodeBlockNode): [string, any, number] {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    return ['pre', { 'data-language': node.attrs.language, 'class': className }, 0];
  }
}

// example of BB style:
// <div class="codehilite language-javascript"><pre><span>hello world</span><span>\n</span></pre></div>
const getLanguageFromBitbucketStyle = (dom: HTMLElement): string | undefined => {
  const parent = dom.parentElement;

  if (parent && parent.classList.contains('codehilite')) {
    // code block html from Bitbucket always contains an extra new line
    removeLastNewLine(dom);
    return extractLanguageFromClass(parent.className);
  }
};

const removeLastNewLine = (dom: HTMLElement): void => {
  dom.textContent = dom.textContent!.replace(/\n$/, '');
};

const getLanguageFromEditorStyle = (dom: HTMLElement): string => {
  return dom.dataset['language'] || '';
};

const extractLanguageFromClass = (className: string): string | undefined => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }
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
