import * as React from 'react';
import { PureComponent } from 'react';
import { isCellSelected } from '../utils';
import { CellSelection } from '../../../prosemirror';
import { Header, Button } from './styles';

export interface Props {
  tableElement: HTMLElement;
  cellSelection?: CellSelection;
  onClick: () => void;
}

export default class CornerHeader extends PureComponent<Props, {}> {
  private isTableSelected () {
    if (!this.props.cellSelection) {
      return false;
    }
    const rows = this.props.tableElement!.querySelectorAll('tr');
    const lastRow = rows[ rows.length - 1 ];
    const lastRowColsCount = lastRow.querySelectorAll('td,th').length;

    return (
      isCellSelected( rows[0].querySelectorAll('td,th')[0] ) &&
      isCellSelected( lastRow.querySelectorAll('td,th')[ lastRowColsCount - 1] )
    );
  }

  render () {
    return (
      <Header className={this.isTableSelected() ? 'active' : ''}>
        <Button onClick={this.props.onClick} />
      </Header>
    );
  }
}
