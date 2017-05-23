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
    display: 'block',
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
    atom: true,
    attrs: {
        macroId: { default: null },
        placeholderUrl: {default: null},
        bodyContent: {default: null}
    },
    parseDOM: [{
        tag: 'div',
        getAttrs: (dom: HTMLElement) => ({
            macroId: dom.dataset.macroId,
            placeholderUrl: dom.dataset.placeholderUrl,
            bodyContent: dom.dataset.bodyContent
        })
    }],
    toDOM(node: any) {
        const attrs = {
            'data-macro-id': node.attrs.macroId
        };

        return ['div', attrs, node.attrs.macroId];
    }
} as NodeSpec;

export const plainTextBlockMacroNodeView = (node: any, view: any, getPos: () => number): NodeView => {
    const { macroId, placeholderUrl, bodyContent } = node.attrs;

    let dom: HTMLElement | undefined = document.createElement('div');
    dom.setAttribute('class', nodeClassName);
    dom.dataset.macroId = macroId;
    dom.dataset.placeholderUrl = placeholderUrl;
    dom.dataset.bodyContent = bodyContent;


    dom.setAttribute('spellcheck', 'false');

    let macroNodeClassName = style({
        display: 'block',
        color: '#707070',
        lineHeight: '24px',
        verticalAlign: 'top',
        backgroundImage: 'url(' + placeholderUrl +')',
        backgroundRepeat: 'none'
    });

    // HACK - I should learn react.
    if (bodyContent.size <= 0) {
        ReactDOM.render(
            <div className={macroNodeClassName} />,
            dom
        );
    } else {
        ReactDOM.render(
            <div className={macroNodeClassName} >{bodyContent}</div>,
            dom
        );
    }


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
