import {
    akBorderRadius,
    akColorN30,
    akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
    group: 'block',
    inline: true,
    atom: true,
    attrs: {
        macroId: { default: null },
        placeholderUrl: {default: null}
    },
    parseDOM: [{
        tag: 'span',
        getAttrs: (dom: HTMLElement) => ({
            macroId: dom.dataset.macroId,
            placeholderUrl: dom.dataset.placeholderUrl
        })
    }],
    toDOM(node: any) {
        const attrs = {
            'data-macro-id': node.attrs.macroId
        };

        return ['span', attrs, node.attrs.macroId];
    }
} as NodeSpec;

export const bodylessBlockMacroNodeView = (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, placeholderUrl } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement('span');
    dom.setAttribute('class', nodeClassName);
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;

    dom.setAttribute('spellcheck', 'false');

    let macroNodeClassName = style({
        display: 'block',
        color: '#707070',
        lineHeight: '24px',
        verticalAlign: 'top',
        backgroundImage: 'url(' + placeholderUrl +')',
        backgroundRepeat: 'none'
    });

    ReactDOM.render(
        <div className={macroNodeClassName} >456</div>,
        dom
    );

    return {
        get dom() {
            return dom;
        },

        destroy() {
            ReactDOM.unmountComponentAtNode(dom!);
            dom = undefined;
        }
    };
};
