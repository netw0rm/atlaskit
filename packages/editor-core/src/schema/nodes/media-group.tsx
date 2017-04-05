import { style } from 'typestyle';
import { NodeSpec } from '../../prosemirror';

const mediaGroupStyle = style({
  display: 'block',
  padding: '0 0 8px 0',
  $nest: {
    '[data-node-type="media"]' : {
      margin: '8px 8px 0 0'
    },
    '&.ProseMirror-selectednode': {
      outline: 'none',
      $nest: {
        '&&> div': {
          outline: '2px solid #8cf'
        }
      }
    },
  }
});

export const mediaGroup: NodeSpec = {
  inline: false,
  group: 'block',
  attrs: {},
  parseDOM: [{
    tag: 'p[data-node-type="mediaGroup"]',
    getAttrs: (dom: Element) => ({})
  }],

  toDOM(node: any): [string, any, number] {
    return [
      'div',
      {
        'data-node-type': 'media_group',
        'class': mediaGroupStyle
      },
      0
    ];
  }
};
