import { ResourcedEmoji } from '@atlaskit/emoji';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style, types as styleTypes } from 'typestyle';

import { NodeSpec, NodeView } from '../../prosemirror';
import ProviderFactory, { WithProviders } from '../../providerFactory';

const width = '20px';
const height = '20px';

const emojiStyle = style({
  display: 'inline-block',
  width: width,
  height: height,
  verticalAlign: 'middle',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      backgroundColor: akColorN50,
      outline: 'none'
    },
    // sprite
    '.emoji-sprite': {
      margin: '0',
      width: width,
      height: height,
    },
    // image
    '> span': {
      margin: '0',
      width: width,
      height: height,
      backgroundSize: `${width} ${height}`,
    },
    // placeholder
    '> svg': {
      margin: '0',
      width: width,
      height: height,

      $nest: {
        'circle': {
          r: '16',
        } as styleTypes.NestedCSSProperties,
      },
    },
  }
});

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-emoji-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('data-emoji-id')!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': emojiStyle,
      'data-emoji-id': node.attrs.id,
      'contenteditable': 'false',
    };
    const fallback = node.attrs.id;
    return ['span', attrs, fallback];
  }
};

export const emojiNodeView = (providerFactory: ProviderFactory) => (node: any, view: any, getPos: () => number): NodeView => {
  let dom: HTMLElement | undefined = document.createElement('span');
  dom.className = emojiStyle;
  const { id } = node.attrs;

  ReactDOM.render(
    <WithProviders
      providers={['emojiProvider']}
      providerFactory={providerFactory}
      renderNode={providers =>
        <ResourcedEmoji
          emojiId={{ id }}
          emojiProvider={providers['emojiProvider']}
        />
      }
    />
  , dom);

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
