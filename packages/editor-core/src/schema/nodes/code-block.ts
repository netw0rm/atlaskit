import { NodeSpec, dom } from '../../prosemirror';

const getLanguageFromEditorStyle = (dom: HTMLElement): string | undefined => {
  return dom.dataset['language'];
};
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

const extractLanguageFromClass = (className: string): string | undefined => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }
};

const removeLastNewLine = (dom: HTMLElement): void => {
  dom.textContent = dom.textContent!.replace(/\n$/, '');
};

export const codeBlock: NodeSpec = {
  attrs: { language: { default: null } },
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{
    tag: 'pre', getAttrs: node => {
      const language = getLanguageFromEditorStyle((node as dom.Node).parentElement!) || getLanguageFromBitbucketStyle((node as dom.Node).parentElement!);
      return [
        {
          'language': language
        },
        {
          preserveWhitespace: true
        }
      ] as any;
    }
  }],
  toDOM(node) { return ['pre', { 'data-language': node.attrs['language'] }, 0]; }
};
