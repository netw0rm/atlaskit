import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import ProviderFactory from '../../providerFactory';
import {
  EditorView,
  Node as PMNode,
  NodeSpec,
  NodeView,
} from '../../prosemirror';
import { ReactPMNode } from '../../react';

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
  content: 'media+',
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

class MediaGroupNodeView implements NodeView {
  private domRef: HTMLElement | undefined;

  constructor(node: PMNode, view: EditorView, providerFactory: ProviderFactory, blockNodeView: boolean) {
    const elementType = blockNodeView ? 'div' : 'span';
    this.domRef = document.createElement(elementType);

    ReactDOM.render(
      <ReactPMNode
        node={node}
        view={view}
        providerFactory={providerFactory}
      />,
      this.domRef!
    );
  }

  get dom() {
    return this.domRef;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
  }
}

export const mediaGroupNodeView = (providerFactory: ProviderFactory, blockNodeView: boolean) => (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
  return new MediaGroupNodeView(node, view, providerFactory, blockNodeView);
};
