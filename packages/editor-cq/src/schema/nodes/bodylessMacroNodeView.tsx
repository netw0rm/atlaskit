import { NodeView } from '@atlaskit/editor-core';

export default function (elementType: string, nodeClassName: string) {
  return (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, placeholderUrl, params } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement(elementType);
    dom.className = nodeClassName;
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;
    dom.dataset.params = params;

    dom.setAttribute('spellcheck', 'false');

    // image placeholder
    const image = document.createElement('img');
    image.src = placeholderUrl; // won't work in storybook as it's a relative URL
    dom.appendChild(image);

    // do async fetch here for actual content
    // setTimeout(() => {
    //   dom!.className = '';
    //   dom!.innerHTML = `<span class="status-macro aui-lozenge">status macro</span>`
    // }, 1000);

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
