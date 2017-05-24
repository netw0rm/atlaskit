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
  private nodeTypeName: string;
  private domRef: HTMLElement | undefined;
  private view: EditorView;
  private getPos: getPosHandler;
  private providerFactory: ProviderFactory;
  private reactNodeViewComponents: ReactNodeViewComponents;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler, providerFactory: ProviderFactory, reactNodeViewComponents: ReactNodeViewComponents, isBlockNodeView: boolean) {
    this.nodeTypeName = node.type.name;
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
    const isValidUpdate = this.nodeTypeName === node.type.name;

    /*
      This is a prosemirror bug:
      NodeView update() should not be called for node of another type
      @see https://github.com/ProseMirror/prosemirror/issues/648
    */
    if (isValidUpdate) {
      this.renderReactComponent(node);
    } else {
      const { getPos, view } = this;
      const startPos = getPos();
      const transaction = view.state.tr.deleteRange(startPos, startPos + node.nodeSize);

      view.dispatch(transaction);
    }

    return isValidUpdate;
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
