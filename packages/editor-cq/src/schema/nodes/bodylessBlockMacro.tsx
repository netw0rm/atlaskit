import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorN50
} from '@atlaskit/util-shared-styles';

const bodylessBlockStyle = style({
  border: `1px solid ${akColorN50}`,
  borderRadius: akBorderRadius,
  margin: '4px 0 4px 0',
  padding: '4px'
});

export default {
  group: 'block',
  attrs: {
    macroId: { default: null },
    macroName: { default: null },
    placeholderUrl: { default: null },
    params: {default: null}
  },
  parseDOM: [{
    tag: 'div[data-type="bodyless-block"]',
    getAttrs: (dom: HTMLElement) => ({
      macroId: dom.dataset.macroId,
      macroName: dom.dataset.macroName,
      placeholderUrl: dom.dataset.placeholderUrl,
      params: dom.dataset.params
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'class': `${bodylessBlockStyle}`,
      'data-type': 'bodyless-block',
      'data-macro-id': node.attrs.macroId,
      'data-macro-name': node.attrs.macroName,
      'data-placeholder-url': node.attrs.placeholderUrl,
      'data-params': node.attrs.params
    };

    const placeholderElement = document.createElement('img');
    placeholderElement.src = node.attrs.placeholderUrl;
    return [
      'div',
      attrs,
      placeholderElement
    ];
  }
} as NodeSpec;
