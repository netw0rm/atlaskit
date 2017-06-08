import * as React from 'react';
import { PureComponent } from 'react';
import { TableState, TableStateSubscriber } from '../../plugins/table';
import { Table } from './styles';
import { Node } from '../../prosemirror';

export interface Props {
  pluginState: TableState;
  children?: any;
  handleRef: (node: HTMLElement | undefined) => void;
  subscribe: (cb: TableStateSubscriber) => void;
}

export interface State {
  isFocused: boolean;
  activeTableNode?: any;
}

export default class TableContainer extends PureComponent<Props, State> {
  state: State = {
    isFocused: false
  };

  componentDidMount () {
    this.props.subscribe(this.handlePluginStateChange);
  }

  render() {
    return (
      <Table innerRef={this.props.handleRef}>
        {this.props.children}
      </Table>
    );
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { tableNode, editorFocused } = pluginState;
    let isFocused = false;
    let { activeTableNode } = this.state;

    if (!activeTableNode) {
      activeTableNode = tableNode;
    }

    if (tableNode && editorFocused && activeTableNode === tableNode) {
      isFocused = true;
    } else {
      isFocused = false;
    }

    this.setState({ isFocused, activeTableNode });
  }
}
