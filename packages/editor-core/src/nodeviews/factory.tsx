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

export interface ReactNodeViewComponents {
  [key: string]: React.ComponentClass<any>;
}

class NodeViewElem implements NodeView {
  private domRef: HTMLElement | undefined;
  private view: EditorView;
  private getPos: getPosHandler;
  private providerFactory: ProviderFactory;
  private reactNodeViewComponents: ReactNodeViewComponents;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler, providerFactory: ProviderFactory, reactNodeViewComponents: ReactNodeViewComponents, isBlockNodeView: boolean) {
    this.view = view;
    this.getPos = getPos;
    this.providerFactory = providerFactory;
    this.reactNodeViewComponents = reactNodeViewComponents;

    const elementType = isBlockNodeView ? 'div' : 'span';
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
    const { getPos, providerFactory, reactNodeViewComponents, view } = this;

    ReactDOM.render(
      <ReactPMNode
        node={node}
        getPos={getPos}
        view={view}
        providerFactory={providerFactory}
        components={reactNodeViewComponents}
      />,
      this.domRef!
    );
  }
}

export default function nodeViewFactory(providerFactory: ProviderFactory, reactNodeViewComponents: ReactNodeViewComponents, isBlockNodeView = false) {
  return (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
    return new NodeViewElem(node, view, getPos, providerFactory, reactNodeViewComponents, isBlockNodeView);
  };
}
