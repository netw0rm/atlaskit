import {
    akBorderRadius,
    akColorN30,
    akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import { style } from 'typestyle';
import bodylessMacroNodeView from './bodylessMacroNodeView';

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
        macroName: { default: null },
        macroId: { default: null },
        placeholderUrl: {default: null},
        params: { default: null },
    },
    parseDOM: [{
        tag: 'span[data-macro-id]',
        getAttrs: (dom: HTMLElement) => ({
            macroId: dom.dataset.macroId,
            macroName: dom.dataset.macroName,
            placeholderUrl: dom.dataset.placeholderUrl,
            params: dom.dataset.params,
        })
    }],
    toDOM(node: any) {
        return ['span', node.attrs, node.attrs.macroId];
    }
} as NodeSpec;

export const inlineMacroNodeView: (node: any, view: any, getPos: () => number) => NodeView  = bodylessMacroNodeView('span', nodeClassName);
