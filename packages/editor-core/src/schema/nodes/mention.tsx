import {
  akColorN30,
  akColorN50,
  akColorN500
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ResourcedMention } from '@atlaskit/mention';
import { style } from 'typestyle';
import {
  Node as PMNode,
  NodeSpec,
  NodeView,
} from '../../prosemirror';
import ProviderFactory, { WithProviders } from '../../providerFactory';

const mentionStyle = style({
  background: akColorN30,
  borderRadius: '20px',
  color: akColorN500,
  padding: '0 4px 2px 3px',
  userSelect: 'all',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export const mention: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
    text: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      text: dom.textContent!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': mentionStyle,
      'mention-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.text];
  }
};

class MentionNodeView implements NodeView {
  dom: HTMLElement | undefined = document.createElement('span');

  constructor(node: PMNode, providerFactory: ProviderFactory) {
    const { id, text } = node.attrs;

    ReactDOM.render(
      <WithProviders
        providers={['mentionProvider']}
        providerFactory={providerFactory}
        // tslint:disable-next-line:jsx-no-lambda
        renderNode={providers =>
          <ResourcedMention
            id={id}
            text={text}
            mentionProvider={providers['mentionProvider']}
          />
        }
      />,
      this.dom!
    );
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.dom!);
    this.dom = undefined;
  }
}

export const mentionNodeView = (providerFactory: ProviderFactory) => (node: PMNode, view: any, getPos: () => number): NodeView => {
  return new MentionNodeView(node, providerFactory);
};
