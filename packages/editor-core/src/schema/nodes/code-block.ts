import { NodeSpec, dom, browser } from '../../prosemirror';

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

export const codeBlock: NodeSpec = {
  attrs: { language: { default: null } },
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{
    tag: 'pre', preserveWhitespace: 'full', getAttrs: (dom: Element) => {
      const language = (
        getLanguageFromBitbucketStyle((dom as dom.Node).parentElement!) ||
        getLanguageFromEditorStyle((dom as dom.Node).parentElement!) ||
        dom.getAttribute('data-language')!
      );
      dom = removeLastNewLine(dom as HTMLElement);
      return { language, preserveWhitespace: 'full' };
    }
  }],
  toDOM(node): [string, any, number] {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    return ['pre', { 'data-language': node.attrs.language, 'class': className }, 0];
  }
};
