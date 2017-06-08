import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { stateKey as tableStateKey, TableState, TableStateSubscriber } from '../../plugins/table';
import { EditorView, Node as PMNode, NodeView } from '../../prosemirror';
import Table from '../../ui/Table';

class TableView implements NodeView {
  private pluginState: TableState;
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;
  private subscriber: TableStateSubscriber;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.pluginState = tableStateKey.getState(view.state);
    this.renderReactComponent();
    this.pluginState.subscribe(this.subscriber);
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.contentDOMRef;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
    this.contentDOMRef = undefined;

    // unsubscribe Table's handlePluginStateChange here
    // because Table's componentWillUnmount is never get called!
    this.pluginState.unsubscribe(this.subscriber);
  }

  handleRef = (node: HTMLElement | undefined) => {
    this.contentDOMRef = node;
  }

  subscribe = (cb: TableStateSubscriber) => {
    this.subscriber = cb;
  }

  private renderReactComponent() {
    this.domRef = document.createElement('div');

    ReactDOM.render(
      <Table
        handleRef={this.handleRef}
        pluginState={this.pluginState}
        subscribe={this.subscribe}
      />,
      this.domRef
    );
  }
}

export type getPosHandler = () => number;

export const tableNodeView = (node: any, view: any, getPos: () => number): NodeView => {
  return new TableView(node, view, getPos);
};
