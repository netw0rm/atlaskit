import * as React from 'react';
import { Component } from 'react';
import {
  RowContainer,
  Header,
  ButtonWrap,
  Button
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  onClick: (index: number) => void;
}

export default class RowHeader extends Component<Props, {}> {
  render () {
    return (
      <Header>
        <RowContainer>
          {this.renderHeaders()}
        </RowContainer>
      </Header>
    );
  }

  private renderHeaders () {
    const rows = this.props.tableElement!.querySelector('tbody')!.children;
    const nodes: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <ButtonWrap
          key={i}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
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
