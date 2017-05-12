import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { PositionedNode } from './';
import { ReactNodeViewState } from '../plugins';
import {
  EditorView,
  NodeSelection,
} from '../prosemirror';

interface Props {
  node: PositionedNode;
  view: EditorView;
  pluginState: ReactNodeViewState;
}

interface State {
  selected: boolean;
}

/* tslint:disable:variable-name */
const SelectedNode = styled.div`outline: 2px solid #8cf`;
const NonSelectedNode = styled.div``;
/* tslint:enable:variable-name */

export default class WrapperClickArea extends PureComponent<Props, State> {
  state: State = { selected: false };

  componentDidMount() {
    const { pluginState } = this.props;
    pluginState.subscribe(this.handlePluginSelectionChange);
  }

  componentWillUnmount() {
    const { pluginState } = this.props;
    pluginState.unsubscribe(this.handlePluginSelectionChange);
  }

  render() {
    // tslint:disable-next-line:variable-name
    const Wrapper = this.state.selected
      ? SelectedNode
      : NonSelectedNode;

    return <Wrapper onClick={this.onClick}>{this.props.children}</Wrapper>;
  }

  private handlePluginSelectionChange = (anchorPos: number, headPos: number) => {
    const { node } = this.props;
    const nodePos = node.getPos();

    this.setState({
      selected: nodePos >= anchorPos && nodePos < headPos
    });
  }

  private onClick = () => {
    const { node, view } = this.props;
    const { doc, tr } = view.state;
    const pos = doc.resolve(node.getPos());
    const selection = new NodeSelection(pos);

    view.dispatch(tr.setSelection(selection));
  }
}
