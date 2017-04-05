import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { NodeSpec, NodeView, EditorView } from '../../prosemirror';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import MediaComponent from '../../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { locateAndRemoveNode } from '../../utils';

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
        '&&> div': {
          outline: '2px solid #8cf',
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
  group: 'block',
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

  // TODO: This will not be able to read the data-filename attribute and set the node's instance JS property
  toDOM(node: any): [string, any] {
    const attrs = {
      'class': mediaStyle,
      'contenteditable': 'false',
      'data-node-type': 'media',
      'data-id': node.attrs.id,
      'data-type': node.attrs.type,
      'data-collection': node.attrs.collection,
      'data-filename': node.filename ? node.filename : ''
    };

    return ['div', attrs];
  }
};

export const mediaNodeView = (providerFactory: ProviderFactory) => (node: any, view: EditorView, getPos: () => number): NodeView => {
  let div: HTMLElement | undefined = document.createElement('div');
  const { id, type, collection } = node.attrs;

  ReactDOM.render(
    <WithProviders
      providers={['mediaProvider']}
      providerFactory={providerFactory}
      renderNode={providers =>
        <MediaComponent
          mediaProvider={providers['mediaProvider']}
          pluginState={this.pluginState}
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
