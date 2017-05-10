import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ProviderFactory from '../providerFactory';
import {
  EditorView,
  Node as PMNode,
  NodeView,
} from '../prosemirror';
import { ReactPMNode } from '../react';

class NodeViewElem implements NodeView {
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

function nodeViewFactory(providerFactory: ProviderFactory, blockNodeView: boolean) {
  return (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
    return new NodeViewElem(node, view, providerFactory, blockNodeView);
  };
}

export default nodeViewFactory;
