import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import { EditorView } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import Popup from '../Popup';

export interface Props {
  editorView: EditorView;
  pluginState: TableState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  cellElement?: HTMLElement;
  toolbarVisible?: boolean;
}

export default class TableFloatingToolbar extends PureComponent<Props, State> {
  state: State = {
    toolbarVisible: false,
  };

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
        >
          <ToolbarButton
            onClick={this.handleRemove}
            iconBefore={<RemoveIcon label="Remove selected cells" />}
          />
        </Popup>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { cellElement } = pluginState;
    this.setState({ cellElement });
  }

  private handleRemove = () => {
    // console.log('remove!');
  }
}
