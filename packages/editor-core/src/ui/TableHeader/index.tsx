import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import Popup from '../Popup';
import { akEditorFloatingPanelZIndex } from '../../styles';
import { CellSelection, Node, EditorView } from '../../prosemirror';
import CornerHeader from './CornerHeader';
import ColumnHeader from './ColumnHeader';
import RowHeader from './RowHeader';

export interface Props {
  pluginState: TableState;
  editorView: EditorView;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  tableElement?: HTMLElement;
  tableNode?: Node;
  position?: string;
  transform?: string;
  cellSelection?: CellSelection;
}

export default class TableHeader extends PureComponent<Props, State> {
  state: State = {};
  content?: HTMLElement;

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  extractStyles = (state: any) => {
    if (state) {
      const left = Math.round(state.offsets.popper.left);
      const top = Math.round(state.offsets.popper.top);

      this.setState({
        position: state.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
      });
    }
  }

  handleMouseDown = () => {
    this.props.pluginState.updateToolbarFocused(true);
  }

  handleBlur = () => {
    // hide toolbar if it's currently in focus and editor looses focus
    if (!this.props.pluginState.toolbarFocused) {
      this.props.pluginState.updateEditorFocused(false);
      this.props.pluginState.update(this.props.editorView.state, this.props.editorView.docView);
    }
    this.props.pluginState.updateToolbarFocused(false);
  }

  render() {
    const { tableElement } = this.state;
    const { pluginState, popupsBoundariesElement, popupsMountPoint } = this.props;

    if (!tableElement) {
      return null;
    }

    return (
      <Popup
        target={tableElement}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
      >
        <div onMouseDown={this.handleMouseDown} onBlur={this.handleBlur}>
          <CornerHeader
            isSelected={pluginState.isTableSelected}
            selectTable={pluginState.selectTable}
            insertColumn={pluginState.insertColumn}
            insertRow={pluginState.insertRow}
          />
          <ColumnHeader
            tableElement={tableElement}
            isSelected={pluginState.isColumnSelected}
            selectColumn={pluginState.selectColumn}
            insertColumn={pluginState.insertColumn}
          />
          <RowHeader
            tableElement={tableElement}
            isSelected={pluginState.isRowSelected}
            selectRow={pluginState.selectRow}
            insertRow={pluginState.insertRow}
          />
        </div>
      </Popup>
    );
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { tableElement, tableNode, cellSelection } = pluginState;
    this.setState({ tableElement, tableNode, cellSelection });
  }
}
