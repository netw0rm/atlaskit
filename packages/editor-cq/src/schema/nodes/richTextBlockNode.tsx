import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorB50,
  akColorN50
} from '@atlaskit/util-shared-styles';

const richTextBlockStyle = style({
  border: `1px solid ${akColorN50}`,
  borderRadius: akBorderRadius,
  margin: '4px 0 4px 0',
  padding: '4px',
  background: akColorB50
});

const blockNameStyle = style({
  padding: '4px'
});

export default {
  group: 'block',
  content: 'block+',
  attrs: {
    macroId: { default: null },
    macroName: { default: null },
    params: {default: null}
  },
  parseDOM: [{
    tag: 'div[data-type="rich-text-block"]',
    getAttrs: (dom: HTMLElement) => ({
      macroId: dom.dataset.macroId,
      macroName: dom.dataset.macroName,
      params: dom.dataset.params
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'class': `${richTextBlockStyle}`,
      'data-type': 'rich-text-block',
      'data-macro-id': node.attrs.macroId,
      'data-macro-name': node.attrs.macroName,
      'data-params': node.attrs.params
    };

    const blockNameElement = document.createElement('h4');
    blockNameElement.innerText = node.attrs.macroName;
    blockNameElement.setAttribute('class', blockNameStyle);
    return [
      'div',
      attrs,
      blockNameElement,
      ['div', {}, 0]
    ];
  }
} as NodeSpec;
