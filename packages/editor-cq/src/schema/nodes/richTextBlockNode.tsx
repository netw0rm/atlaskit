import { NodeSpec } from '@atlaskit/editor-core';
import { style } from 'typestyle';

const blockNameStyle = style({
  border: '1px dashed #EEE',
  margin: '0 -6px -4px',
  padding: '0 6px 4px',
});

const legendStyle = style({
  color: '#CCC',
  fontSize: '10px',
  padding: '0',
  textTransform: 'uppercase',
  userSelect: 'none',
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
      'data-type': 'rich-text-block',
      'data-macro-id': node.attrs.macroId,
      'data-macro-name': node.attrs.macroName,
      'data-params': node.attrs.params
    };
    return [
      'div',
      attrs,
      [
        'fieldset',
        { 'class': blockNameStyle },
        ['legend', { 'class': legendStyle, contenteditable: false }, node.attrs.macroName + ' macro'],
        ['div', {}, 0]
      ]
    ];
  }
} as NodeSpec;
