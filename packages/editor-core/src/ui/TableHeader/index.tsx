import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import Popper, { IPopper } from './../../popper';
import { akEditorFloatingPanelZIndex } from '../../styles';
import { CellSelection, Node, EditorView } from '../../prosemirror';
import CornerHeader from './CornerHeader';
import ColumnHeader from './ColumnHeader';
import RowHeader from './RowHeader';

export interface Props {
  pluginState: TableState;
  editorView: EditorView;
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
  popper?: IPopper;

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
    if (this.popper) {
      this.popper.destroy();
    }
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
    const { tableElement, position, transform, cellSelection } = this.state;

    if (tableElement) {
      return (
        <div
          ref={this.handleRef}
          style={{ top: 0, left: 0, position, transform, zIndex: akEditorFloatingPanelZIndex }}
          onMouseDown={this.handleMouseDown}
          onBlur={this.handleBlur}
        >
          <CornerHeader
            tableElement={tableElement}
            cellSelection={cellSelection}
            onClick={this.props.pluginState.selectTable}
          />
          <ColumnHeader
            tableElement={tableElement}
            cellSelection={cellSelection}
            onClick={this.props.pluginState.selectCol}
          />
          <RowHeader
            tableElement={tableElement}
            cellSelection={cellSelection}
            onClick={this.props.pluginState.selectRow}
          />
        </div>
      );
    }

    return null;
  }

  private applyPopper(): void {
    const target = this.state.tableElement;

    if (this.popper) {
      this.popper.destroy();
    }

    if (target && this.content instanceof HTMLElement) {
      this.popper = new Popper(target, this.content, {
        onCreate: this.extractStyles,
        onUpdate: this.extractStyles,
        placement: 'top-start',
        modifiers: {
          applyStyle: { enabled: false },
          hide: { enabled: false },
          preventOverflow: {
            enabled: false,
            escapeWithReference: false,
            boundariesElement: target
          },
        },
      });
    }
  }

  private handleRef = (ref: HTMLElement) => {
    this.content = ref;
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { tableElement, tableNode, cellSelection } = pluginState;
    this.setState({ tableElement, tableNode, cellSelection }, this.applyPopper);
  }
}
