import { NodeView } from '@atlaskit/editor-core';

export function bodylessMacroToDom(elementType: string, nodeClassName: string) {
  return (node: any) => {
    const { macroName, macroId, params, placeholderUrl } = node.attrs;
    const attrs = {
      'class': nodeClassName,
      'contenteditable': 'false',
      'data-macro-id': macroId,
      'data-macro-name': macroName,
      'data-placeholder-url': placeholderUrl,
      'data-params': JSON.stringify(params),
    };
    return [elementType, attrs];
  };
}

export default function (elementType: string, nodeClassName: string): (node: any, view: any, getPos: () => number) => NodeView {
  return (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, macroName, placeholderUrl, params } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement(elementType);
    dom.className = nodeClassName;
    dom.dataset.macroName = macroName;
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;
    dom.dataset.params = JSON.stringify(params);

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
          'contentId': '65654', // need to get this from Confluence
          'macro': {
            'name': macroName.toLowerCase(),
            'body': '', // should always be empty for bodyless
            'params': params,
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
        return html.querySelectorAll('.wiki-content > *');
      })
      .then((macroBodies) => {
        if (!macroBodies || !macroBodies.length) {
          return;
        }
        dom!.className = '';
        dom!.innerHTML = '';
        for (let ii = 0; ii < macroBodies.length; ii++) {
          const element = macroBodies[ii];
          if (element.tagName.toUpperCase() !== 'BR') {
            dom!.appendChild(element);
          }
        }
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
