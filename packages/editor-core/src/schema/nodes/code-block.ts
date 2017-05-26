import { NodeSpec, browser } from '../../prosemirror';

const getLanguageFromEditorStyle = (dom: HTMLElement): string | undefined => {
  return dom.dataset['language'];
};

// example of BB style:
// <div class="codehilite language-javascript"><pre><span>hello world</span><span>\n</span></pre></div>
const getLanguageFromBitbucketStyle = (dom: HTMLElement): string | undefined => {
  if (dom && dom.classList.contains('codehilite')) {
    // code block html from Bitbucket always contains an extra new line
    return extractLanguageFromClass(dom.className);
  }
};

const extractLanguageFromClass = (className: string): string | undefined => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }
};

const removeLastNewLine = (dom: HTMLElement): HTMLElement => {
  const parent = dom && dom.parentElement;
  if (parent && parent.classList.contains('codehilite')) {
    dom.textContent = dom.textContent!.replace(/\n$/, '');
  }
  return dom;
};

const isBlock = (node: HTMLElement) => {
  const blockElementsInsideCode = ['DIV', 'P', 'BR'];
  return blockElementsInsideCode.indexOf(node.nodeName.toUpperCase()) > -1 &&
    (!node.style.display || node.style.display === 'block');
};

const getTextFromDOM = (dom: HTMLElement): string => {
  const content: Array<string> = [];
  let line = '';
  // TS doesn't allow Array.from or [...] because of type mismatch
  [].slice.call(dom.childNodes).forEach((child: Node) => {
    if (child.nodeType === Node.TEXT_NODE) {
      line += child.textContent || '';
    }
    else if (child.nodeType === Node.ELEMENT_NODE) {
      line += getTextFromDOM(child as HTMLElement) || '';
      if (isBlock(child as HTMLElement)) {
        content.push(line);
        line = '\n';
      }
    }
  });
  if (line) {
    content.push(line);
  }
  return content.join('');
};

export const codeBlock: NodeSpec = {
  attrs: { language: { default: null } },
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{
    tag: 'pre',
    preserveWhitespace: 'full',
    getAttrs: (dom: HTMLElement) => {
      const language = (
        getLanguageFromBitbucketStyle(dom.parentElement!) ||
        getLanguageFromEditorStyle(dom.parentElement!) ||
        dom.getAttribute('data-language')!
      );
      dom.textContent = getTextFromDOM(removeLastNewLine(dom));
      return { language };
    }
  },
  // Handle VSCode paste, it wraps copied content with
  // <div style="...white-space: pre;...">
  {
    tag: 'div[style]',
    preserveWhitespace: 'full',
    getAttrs: (dom: HTMLElement) => {
      if (
        dom.style.whiteSpace === 'pre' || dom.style.whiteSpace === 'pre-wrap' ||
        (dom.style.fontFamily && dom.style.fontFamily.toLowerCase().indexOf('monospace') > -1)
      ) {
        dom.textContent = getTextFromDOM(dom).replace(/\n$/, '');
        return {};
      }
      return false;
    }
  }],
  toDOM(node): [string, any, number] {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    return ['pre', { 'data-language': node.attrs.language, 'class': className }, 0];
  }
};
