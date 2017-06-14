import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import Popper, { IPopper } from './../../popper';
import { akEditorFloatingPanelZIndex } from '../../styles';
import { CellSelection, Node, EditorView } from '../../prosemirror';
import {
  TableHeader,
  TableHeaderButton,
  ColHeaderWrap,
  ColHeaderWrapInner,
  RowHeaderWrapInner,
  ColHeader,
  RowHeaderWrap,
  RowHeader,
} from './styles';
import { isCellSelected } from './utils';
import { ColHeaderButtonWrap } from './ColHeaderButtonWrap';
import { RowHeaderButtonWrap } from './RowHeaderButtonWrap';

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

export default class ToolbarTable extends PureComponent<Props, State> {
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
    const { tableElement, position, transform } = this.state;

    if (tableElement) {
      return (
        <div
          ref={this.handleRef}
          style={{ top: 0, left: 0, position, transform, zIndex: akEditorFloatingPanelZIndex }}
          onMouseDown={this.handleMouseDown}
          onBlur={this.handleBlur}
        >
          <TableHeader className={this.isTableSelected() ? 'active' : ''}>
            <TableHeaderButton onClick={this.props.pluginState.selectTable} />
          </TableHeader>
          <ColHeaderWrap>
            <ColHeaderWrapInner>
              {this.renderColHeaders()}
            </ColHeaderWrapInner>
          </ColHeaderWrap>
          <RowHeaderWrap>
            <RowHeaderWrapInner>
              {this.renderRowHeaders()}
            </RowHeaderWrapInner>
          </RowHeaderWrap>
        </div>
      );
    }

    return null;
  }

  private renderColHeaders () {
    const { tableElement, cellSelection } = this.state;
    const firstRow = tableElement!.querySelector('tr');
    const cols = firstRow!.querySelectorAll('td,th');
    const headers: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      const rows = tableElement!.querySelectorAll('tr');
      const active = (
        !!cellSelection &&
        isCellSelected( rows[0].querySelectorAll('td,th')[i] ) &&
        isCellSelected( rows[ rows.length - 1 ].querySelectorAll('td,th')[i] )
      );

      headers.push(
        <ColHeader
          key={i}
          style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}
          className={active ? 'active' : ''}
        >
          <ColHeaderButtonWrap col={i} onClick={this.props.pluginState.selectCol} />
        </ColHeader>
      );
    }
    return headers;
  }

  private renderRowHeaders () {
    const { tableElement, cellSelection } = this.state;
    const rows = tableElement!.querySelectorAll('tr');
    const headers: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      const cols = rows[i]!.querySelectorAll('td,th');
      const active = (
        !!cellSelection &&
        isCellSelected( cols[0] ) &&
        isCellSelected( cols[ cols.length - 1 ] )
      );

      headers.push(
        <RowHeader
          key={i}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
          className={active ? 'active' : ''}
        >
          <RowHeaderButtonWrap row={i} onClick={this.props.pluginState.selectRow} />
        </RowHeader>
      );
    }
    return headers;
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

  private isTableSelected () {
    if (!this.state.cellSelection) {
      return false;
    }
    const rows = this.state.tableElement!.querySelectorAll('tr');
    const lastRow = rows[ rows.length - 1 ];
    const lastRowColsCount = lastRow.querySelectorAll('td,th').length;

    return (
      isCellSelected( rows[0].querySelectorAll('td,th')[0] ) &&
      isCellSelected( lastRow.querySelectorAll('td,th')[ lastRowColsCount - 1] )
    );
  }
}
