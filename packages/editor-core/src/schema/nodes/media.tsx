import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { NodeSpec, NodeView, EditorView } from '../../prosemirror';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import MediaComponent from '../../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { locateAndRemoveNode } from '../../utils';
import { stateKey as mediaStateKey } from '../../plugins/media';

const mediaStyle = style({
  display: 'inline-block',
  verticalAlign: 'middle',
  '-moz-user-select': 'all',
  '-webkit-user-select': 'all',
  '-ms-user-select': 'all',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      outline: 'none',
      $nest: {
        '.card': {
          outline: '3px solid #8cf',
          background: akColorN50,
        }
      }
    },
  }
});

export type MediaType = 'file' | 'link';

export interface Attributes {
  id: string;
  type: MediaType;
  collection: string;
};

export const media: NodeSpec = {
  inline: false,
  selectable: true,
  attrs: {
    id: { default: '' },
    type: { default: '' },
    collection: { default: null }
  },
  parseDOM: [{
    tag: 'div[data-node-type="media"]',
    getAttrs: (dom: Element) => ({
      id: (dom.getAttribute('data-id')! || ''),
      type: dom.getAttribute('data-type')!,
      collection: dom.getAttribute('data-collection')!
    })
  }],
};

export const mediaNodeView = (providerFactory: ProviderFactory) => (node: any, view: EditorView, getPos: () => number): NodeView => {
  const { id, type, collection } = node.attrs;
  const pluginState = mediaStateKey.getState(view.state);
  let div: HTMLElement | undefined = document.createElement('div');

  const attrs = {
    'class': mediaStyle,
    'contenteditable': 'false',
    'spellcheck' : 'false',
    'data-node-type': 'media',
    'data-id': node.attrs.id,
    'data-type': node.attrs.type,
    'data-collection': node.attrs.collection,
    'data-filename': node.filename ? node.filename : ''
  };

  for (let key of Object.keys(attrs) ){
    div.setAttribute(key, attrs[key]);
  }

  // We're injecting the node with the callback for resolving current doc position.
  // This way we can perform transformations on the node in the future.
  node.getPos = getPos;

  ReactDOM.render(
    <WithProviders
      providers={['mediaProvider']}
      providerFactory={providerFactory}
      renderNode={providers =>
        <MediaComponent
          mediaProvider={providers['mediaProvider']}
          pluginState={pluginState}
          id={id!}
          type={type!}
          collection={collection!}
          onDelete={locateAndRemoveNode(view, getPos)}
        />
      }
    />
  , div);

  return {
    get dom() {
      return div;
    },

    destroy() {
      ReactDOM.unmountComponentAtNode(div!);
      div = undefined;
    }
  };
};
