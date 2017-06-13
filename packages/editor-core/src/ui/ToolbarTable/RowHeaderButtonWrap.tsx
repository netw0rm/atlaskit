import * as React from 'react';
import { PureComponent } from 'react';
import { RowHeaderButton } from './styles';
import { Node } from '../../prosemirror';

export class RowHeaderButtonWrap extends PureComponent<{row: number; onClick: Function; tableNode?: Node}, {}> {
  handleClick = () => this.props.onClick(this.props.row, this.props.tableNode);

  render () {
    return (
      <RowHeaderButton onClick={this.handleClick} />
    );
  }
}
