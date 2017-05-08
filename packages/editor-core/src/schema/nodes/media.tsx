import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { NodeSpec, NodeView, EditorView, Node } from '../../prosemirror';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import MediaComponent from '../../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { locateAndRemoveNode } from '../../utils';
import { mediaStateKey, MediaPluginState } from '../../plugins';

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
}

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
  toDOM(node: any) {
    const attrs = {
      'data-id': node.attrs.id,
      'data-node-type': 'media',
      'data-type': node.attrs.type,
      'data-collection': node.attrs.collection,
      // toDOM is used for static rendering as well as editor rendering. This comes into play for
      // emails, copy/paste, etc, so the title and styling here *is* useful (despite a React-based
      // node view being used for editing).
      'title': 'Attachment',
      // Manually kept in sync with the style of media cards. The goal is to render a plain grey
      // rectangle that provides an affordance for media.
      'style': 'display: inline-block; border-radius: 3px; background: #EBECF0; height: 104px; width: 156px; box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);'
    };

    return ['div', attrs];
  },
};

export const mediaNodeView = (providerFactory: ProviderFactory) => (node: any, view: EditorView, getPos: () => number): NodeView => {
  const { id, type, collection } = node.attrs;
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
      // tslint:disable-next-line:jsx-no-lambda
      renderNode={providers =>
        <MediaComponent
          mediaProvider={providers['mediaProvider']}
          editorView={view}
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
      if (!div) {
        console.warn('Editor: Media node view is being destroyed twice');
        return;
      }
      const pluginState = mediaStateKey.getState(view.state) as MediaPluginState;
      ReactDOM.unmountComponentAtNode(div!);
      div = undefined;
      pluginState.handleMediaNodeRemoval(node);
    }
  };
};

export interface MediaNode extends Node {
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;
}
