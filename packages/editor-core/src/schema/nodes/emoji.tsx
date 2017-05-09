import { ResourcedEmoji } from '@atlaskit/emoji';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';

import { NodeSpec, NodeView } from '../../prosemirror';
import ProviderFactory, { WithProviders } from '../../providerFactory';

const emojiStyle = style({
  display: 'inline-block',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      backgroundColor: akColorN50,
      outline: 'none'
    },
  }
});

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    shortName: { default: '' },
    id: { default: '' },
    fallback: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-emoji-short-name]',
    getAttrs: (dom: Element) => ({
      shortName: dom.getAttribute('data-emoji-short-name')!,
      id: dom.getAttribute('data-emoji-id')!,
      fallback: dom.getAttribute('data-emoji-fallback')!,
    })
  }],
  toDOM(node: any): [string, any, string] {
    const { shortName, id, fallback } = node.attrs;
    const attrs = {
      'class': emojiStyle,
      'data-emoji-short-name': shortName,
      'data-emoji-id': id,
      'data-emoji-fallback': fallback,
      'contenteditable': 'false',
    };
    // Don't render any text as it will be replaced quite quickly by
    // the placeholder in ResourcedEmoji
    return ['span', attrs, ' '];
  }
};

export const emojiNodeView = (providerFactory: ProviderFactory) => (node: any, view: any, getPos: () => number): NodeView => {
  let dom: HTMLElement | undefined = document.createElement('span');
  dom.className = emojiStyle;
  const { shortName, id, fallback } = node.attrs;

  ReactDOM.render(
    <WithProviders
      providers={['emojiProvider']}
      providerFactory={providerFactory}
      // tslint:disable-next-line:jsx-no-lambda
      renderNode={providers =>
        <ResourcedEmoji
          emojiId={{ shortName, id, fallback }}
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
