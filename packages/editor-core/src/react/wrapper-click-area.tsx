import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import { ReactNodeViewState } from '../plugins';
import ProviderFactory from '../providerFactory';
import {
  EditorView,
  NodeSelection,
} from '../prosemirror';

interface Props {
  node: PositionedNode;
  pluginState: ReactNodeViewState;
  providerFactory: ProviderFactory;
  view: EditorView;
}

interface State {
  selected: boolean;
}

// tslint:disable-next-line:variable-name
export default function wrapComponentWithClickArea(ReactComponent: new() => React.Component<any, any>) {
  return class WrapperClickArea extends PureComponent<Props, State> {
    state: State = { selected: false };

    componentDidMount() {
      const { pluginState } = this.props;
      pluginState.subscribe(this.handleDocumentSelectionChange);
    }

    componentWillUnmount() {
      const { pluginState } = this.props;
      pluginState.unsubscribe(this.handleDocumentSelectionChange);
    }

    render() {
      return (
        <div onClick={this.onClick}>
          <ReactComponent
            {...this.props}
            selected={this.state.selected}
          />
        </div>
      );
    }

    private handleDocumentSelectionChange = (anchorPos: number, headPos: number) => {
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
  };
}
