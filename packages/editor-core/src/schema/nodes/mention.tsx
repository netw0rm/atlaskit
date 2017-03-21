import {
  akColorN30,
  akColorN50,
  akColorN500
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ResourcedMention } from '@atlaskit/mention';
import { style } from 'typestyle';
import { NodeSpec } from '../../prosemirror';
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
    displayName: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      displayName: dom.textContent!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const attrs = {
      'class': mentionStyle,
      'mention-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.displayName];
  }
};

interface NodeView {
  dom?: any;
  contentDOM?: any;
  update?: (node: any, decorations: any[]) => boolean;
  selectNode?: () => void;
  deselectNode?: () => void;
  setSelection?: (anchor: number, head: number, root: any) => void;
  stopEvent?: (event: Event) => boolean;
  ignoreMutation?: (mutation: any) => boolean;
  destroy?: () => void;
}

export const mentionNodeView = (providerFactory: ProviderFactory) => (node: any, view: any, getPos: () => number): NodeView => {
  let dom: HTMLElement | null = document.createElement('span');
  const { id, displayName } = node.attrs;

  ReactDOM.render(
    <WithProviders
      providers={['mentionProvider']}
      providerFactory={providerFactory}
      renderNode={providers =>
        <ResourcedMention
          id={id}
          text={displayName}
          mentionProvider={providers['mentionProvider']}
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
      dom = null;
    }
  };
};
