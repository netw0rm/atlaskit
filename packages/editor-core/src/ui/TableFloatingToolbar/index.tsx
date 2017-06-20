import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import { EditorView } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { FloatingToolbar } from './styles';

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
        <FloatingToolbar
          target={cellElement}
          offset={[0, 3]}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
        >
          <ToolbarButton
            onClick={this.handleRemove}
            iconBefore={<RemoveIcon label="Remove selected cells" />}
          />
        </FloatingToolbar>
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
