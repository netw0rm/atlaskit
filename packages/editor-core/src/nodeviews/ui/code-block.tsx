import { Node as PMNode, NodeView, browser } from '../../prosemirror';
import * as hljs from 'highlight.js';

class CodeBlock implements NodeView {
  private domRef: HTMLElement | undefined;

  constructor(node: PMNode) {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    this.domRef = document.createElement('pre');
    this.domRef.innerText = 'var i = 10;';
    this.domRef.className = className;
    this.domRef.dataset['language'] = node.attrs.language;
    hljs.highlightBlock(this.domRef);
  }

  get dom() {
    return this.domRef;
  }

  destroy() {
    this.domRef = undefined;
  }
}

export const codeBlockNodeView = (node: any): NodeView => {
  return new CodeBlock(node);
};
