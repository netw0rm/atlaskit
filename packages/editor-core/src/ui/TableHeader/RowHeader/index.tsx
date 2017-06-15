import * as React from 'react';
import { Component } from 'react';
import { isCellSelected } from '../utils';
import { CellSelection } from '../../../prosemirror';
import {
  RowContainer,
  Header,
  ButtonWrap,
  Button
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  cellSelection?: CellSelection;
  onClick: (index: number) => void;
}

export default class RowHeader extends Component<Props, {}> {
  private renderHeaders () {
    const { tableElement, cellSelection } = this.props;
    const rows = tableElement!.querySelectorAll('tr');
    const nodes: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      const cols = rows[i]!.querySelectorAll('td,th');
      const active = (
        !!cellSelection &&
        isCellSelected( cols[0] ) &&
        isCellSelected( cols[ cols.length - 1 ] )
      );

      nodes.push(
        <ButtonWrap
          key={i}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
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
        <RowContainer>
          {this.renderHeaders()}
        </RowContainer>
      </Header>
    );
  }
}
