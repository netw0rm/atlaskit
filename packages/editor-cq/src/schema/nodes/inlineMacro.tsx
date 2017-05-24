import {
    akBorderRadius,
    akColorN30,
    akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import { style } from 'typestyle';

const nodeClassName = style({
    alignItems: 'center',
    background: akColorN30,
    border: `1px solid ${akColorN50}`,
    borderRadius: akBorderRadius,
    boxSizing: 'border-box',
    cursor: 'default',
    display: 'inline-flex',
    fontSize: '13px',
    margin: '0 2px',
    minHeight: 24,
    padding: '0 4px',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',

    $nest: {
        '&.ProseMirror-selectednode': {
            background: akColorN50,
            outline: 'none'
        }
    }
});
export default {
    group: 'inline',
    inline: true,
    atom: true,
    attrs: {
        name: { default: null },
        macroId: { default: null },
        placeholderUrl: {default: null},
        params: { default: null }
    },
    parseDOM: [{
        tag: 'span[data-macro-id]',
        getAttrs: (dom: HTMLElement) => ({
            name: dom.dataset.name,
            macroId: dom.dataset.macroId,
            placeholderUrl: dom.dataset.placeholderUrl,
            params: dom.dataset.params
        })
    }],
    toDOM(node: any) {
        return ['span', node.attrs, node.attrs.macroId];
    }
} as NodeSpec;

export const inlineMacroNodeView = (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, placeholderUrl, params } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement('span');
    dom.className = nodeClassName;
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;
    dom.dataset.params = params;

    dom.setAttribute('spellcheck', 'false');

    // image placeholder
    const image = document.createElement('img');
    image.src = placeholderUrl;
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
