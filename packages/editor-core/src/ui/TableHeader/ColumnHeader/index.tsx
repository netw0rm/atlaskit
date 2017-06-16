import * as React from 'react';
import { Component } from 'react';
import {
  ColumnContainer,
  Header,
  ButtonWrap,
  Button
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (column: number) => boolean;
  onClick: (column: number) => void;
}

export default class ColumnHeader extends Component<Props, {}> {
  render () {
    return (
      <Header>
        <ColumnContainer>
          {this.renderHeaders()}
        </ColumnContainer>
      </Header>
    );
  }

  private renderHeaders () {
    const firstRow = this.props.tableElement!.querySelector('tr');
    const cols = firstRow!.querySelectorAll('td,th');
    const nodes: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      nodes.push(
        <ButtonWrap
          key={i}
          style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}
          className={this.props.isSelected(i) ? 'active' : ''}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <Button onClick={() => this.props.onClick(i)} />
        </ButtonWrap>
      );
    }

    return nodes;
  }
}
