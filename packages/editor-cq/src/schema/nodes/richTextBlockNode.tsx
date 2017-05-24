import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorB50
} from '@atlaskit/util-shared-styles';

const panelStyle = style({
  borderRadius: akBorderRadius,
  margin: '4px 0 4px 0',
  padding: '4px',
  background: akColorB50
});

export default {
  group: 'block',
  content: 'block+',
  attrs: {
    macroId: { default: null },
    placeholderUrl: {default: null},
  },
  parseDOM: [{
    tag: 'div[data-type="rich-text-block"]',
    getAttrs: (dom: HTMLElement) => ({
      macroId: dom.dataset.macroId,
      placeholderUrl: dom.dataset.placeholderUrl,
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'class': `${panelStyle}`,
      'data-type': 'rich-text-block'
    };
    return [
      'div',
      attrs,
      0
    ];
  }
} as NodeSpec;
