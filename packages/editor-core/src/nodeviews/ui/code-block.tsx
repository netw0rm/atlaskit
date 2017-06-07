import { Node as PMNode, browser, Decoration } from '../../prosemirror';
import * as hljs from 'highlight.js';

class CodeBlock {
  private domRef: HTMLElement | undefined;

  constructor(node: PMNode) {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    this.domRef = document.createElement('pre');
    this.domRef.className = className;
    if (node.attrs.language) {
      this.domRef.dataset['language'] = node.attrs.language;
    }
    hljs.highlightBlock(this.domRef);
  }

  update(node: PMNode, decoration: [Decoration]): boolean | undefined {
    this.domRef!.innerText = 'var i = 10; /** testing */\nvar i = 10; /** testing */var i = 10; /** testing */\nvar i = 10; /** testing */';
    if (node.attrs.language) {
      this.domRef!.dataset['language'] = node.attrs.language;
    }
    hljs.highlightBlock(this.domRef!);
    return true;
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.domRef;
  }

  destroy() {
    this.domRef = undefined;
  }
}

export const codeBlockNodeView = (node: any): any => {
  return new CodeBlock(node);
};
