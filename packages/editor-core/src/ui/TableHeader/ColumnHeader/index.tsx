import * as React from 'react';
import { Component } from 'react';
import { isCellSelected } from '../utils';
import { CellSelection } from '../../../prosemirror';
import {
  ColumnContainer,
  Header,
  ButtonWrap,
  Button
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  cellSelection?: CellSelection;
  onClick: (index: number) => void;
}

export default class ColumnHeader extends Component<Props, {}> {
  private renderHeaders () {
    const { tableElement, cellSelection } = this.props;
    const firstRow = tableElement!.querySelector('tr');
    const cols = firstRow!.querySelectorAll('td,th');
    const nodes: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      const rows = tableElement!.querySelectorAll('tr');
      const active = (
        !!cellSelection &&
        isCellSelected( rows[0].querySelectorAll('td,th')[i] ) &&
        isCellSelected( rows[ rows.length - 1 ].querySelectorAll('td,th')[i] )
      );

      nodes.push(
        <ButtonWrap
          key={i}
          style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}
          className={active ? 'active' : ''}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <Button onClick={() => this.props.onClick(i)} />
        </ButtonWrap>
      );
    }
    return nodes;
  }

  render () {
    return (
      <Header>
        <ColumnContainer>
          {this.renderHeaders()}
        </ColumnContainer>
      </Header>
    );
  }
}
