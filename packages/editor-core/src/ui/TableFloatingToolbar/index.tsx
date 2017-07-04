import * as React from 'react';
import { Component } from 'react';
import { TableState } from '../../plugins/table';
import { EditorView, CellSelection } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import Popup from '../Popup';
import { Toolbar } from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: TableState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  cellElement?: HTMLElement;
  cellSelection?: CellSelection;
}

export default class TableFloatingToolbar extends Component<Props, State> {
  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { cellElement } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;

    if (cellElement) {
      return (
        <Popup
          target={cellElement}
          offset={[0, 3]}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          alignY="top"
        >
          <Toolbar>
            <ToolbarButton
              onClick={this.handleRemove}
              iconBefore={<RemoveIcon label="Remove selected cells" />}
            />
          </Toolbar>
        </Popup>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { cellElement, cellSelection } = pluginState;
    this.setState({ cellElement, cellSelection });
  }

  private handleRemove = () => {
    this.props.pluginState.remove();
  }
}
