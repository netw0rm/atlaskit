import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ProviderFactory from '../providerFactory';
import {
  EditorView,
  Node as PMNode,
  NodeView,
} from '../prosemirror';
import { ReactPMNode } from './ui';

type getPosHandler = () => number;

class NodeViewElem implements NodeView {
  private domRef: HTMLElement | undefined;
  private view: EditorView;
  private getPos: getPosHandler;
  private providerFactory: ProviderFactory;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler, providerFactory: ProviderFactory, blockNodeView: boolean) {
    this.view = view;
    this.getPos = getPos;
    this.providerFactory = providerFactory;

    const elementType = blockNodeView ? 'div' : 'span';
    this.domRef = document.createElement(elementType);

    this.renderReactComponent(node);
  }

  get dom() {
    return this.domRef;
  }

  update(node: PMNode) {
    this.renderReactComponent(node);
    return true;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
  }

  private renderReactComponent(node: PMNode) {
    const { getPos, providerFactory, view } = this;

    ReactDOM.render(
      <ReactPMNode
        node={node}
        getPos={getPos}
        view={view}
        providerFactory={providerFactory}
      />,
      this.domRef!
    );
  }
}

export default function nodeViewFactory(providerFactory: ProviderFactory, blockNodeView: boolean) {
  return (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
    return new NodeViewElem(node, view, getPos, providerFactory, blockNodeView);
  };
}
