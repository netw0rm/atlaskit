import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import bodylessMacroNodeView from './bodylessMacroNodeView';

const nodeClassName = style({
  background: akColorN30,
  border: `1px solid ${akColorN50}`,
  borderRadius: akBorderRadius,
  cursor: 'default',
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
        macroName: { default: null },
        placeholderUrl: {default: null},
        params: { default: null }
    },
    parseDOM: [{
        tag: 'div[data-macro-id]',
        getAttrs: (dom: HTMLElement) => ({
            macroId: dom.dataset.macroId,
            macroName: dom.dataset.macroName,
            placeholderUrl: dom.dataset.placeholderUrl,
            params: dom.dataset.params
        })
    }],
    toDOM(node: any) {
        return ['div', node.attrs, node.attrs.macroId];
    }
} as NodeSpec;

export const bodylessBlockMacroNodeView = bodylessMacroNodeView('div', nodeClassName);
