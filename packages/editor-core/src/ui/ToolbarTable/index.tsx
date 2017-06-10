import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import Popper, { IPopper } from './../../popper';
import { akEditorFloatingPanelZIndex } from '../../styles';
import {
  TableHeader,
  TableHeaderButton,
  ColHeaderWrap,
  ColHeaderWrapInner,
  RowHeaderWrapInner,
  ColHeader,
  ColHeaderButton,
  RowHeaderWrap,
  RowHeader,
  RowHeaderButton
} from './styles';

export interface Props {
  pluginState: TableState;
}

export interface State {
  tableElement?: HTMLElement;
  tableNode?: Node;
  position?: string;
  transform?: string;
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

  render() {
    const { tableElement, position, transform } = this.state;
    const style = { top: 0, left: 0, position, transform, zIndex: akEditorFloatingPanelZIndex };

    if (tableElement) {
      return (
        <div ref={this.handleRef} style={style}>
          <TableHeader>
            <TableHeaderButton />
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
    const { tableElement } = this.state;
    const firstRow = tableElement!.querySelector('tr');
    const cols = firstRow!.querySelectorAll('td,th');
    const result: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      result.push(
        <ColHeader key={i} style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}>
          <ColHeaderButton />
        </ColHeader>
      );
    }
    return result;
  }

  private renderRowHeaders () {
    const { tableElement } = this.state;
    const rows = tableElement!.querySelectorAll('tr');
    const result: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      result.push(
        <RowHeader key={i} style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}>
          <RowHeaderButton />
        </RowHeader>
      );
    }
    return result;
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
          applyStyle: {
            enabled: false,
          },
          hide: {
            enabled: false
          },
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
    const { tableElement, tableNode } = pluginState;
    this.setState({ tableElement, tableNode }, this.applyPopper);
  }
}
