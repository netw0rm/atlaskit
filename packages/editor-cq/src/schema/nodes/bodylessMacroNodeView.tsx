import { NodeView } from '@atlaskit/editor-core';

export default function (elementType: string, nodeClassName: string): (node: any, view: any, getPos: () => number) => NodeView {
  return (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, macroName, placeholderUrl, params } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement(elementType);
    dom.className = nodeClassName;
    dom.dataset.macroName = macroName;
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;
    dom.dataset.params = params;

    dom.setAttribute('spellcheck', 'false');

    // image placeholder
    const image = document.createElement('img');
    image.src = placeholderUrl; // will only work on Confluence (relative URL)
    dom.appendChild(image);

    // TODO: Use Confluence.getContextPath() (instead of hardcoding `wiki`)
    const request = new Request(
      '/wiki/rest/tinymce/1/macro/preview',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          'contentId': '65654',
          'macro': {
            'name': macroName.toLowerCase(),
            'body': '', // should always be empty for bodyless
            'params': {}, // key value json pairs of params string
          },
        }),
      }
    );
    // This is SUPER HACKY!
    fetch(request)
      .then((response) => response.text())
      .then((responseText) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(responseText, 'text/html');
        return html.querySelector('.wiki-content > *');
      })
      .then((macroBody) => {
        if (!macroBody) {
          return;
        }
        dom!.className = '';
        dom!.innerHTML = macroBody.outerHTML;
      })
      .catch(() => null);

    return {
        get dom() {
            return dom;
        },

        destroy() {
            dom = undefined;
        }
    };
  };
}
