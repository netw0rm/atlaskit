import * as React from 'react';
import { PureComponent } from 'react';
import { RowHeaderButton } from './styles';

export class RowHeaderButtonWrap extends PureComponent<{row: number; onClick: Function;}, {}> {
  handleClick = () => this.props.onClick(this.props.row);

  render () {
    return (
      <RowHeaderButton onClick={this.handleClick} />
    );
  }
}
