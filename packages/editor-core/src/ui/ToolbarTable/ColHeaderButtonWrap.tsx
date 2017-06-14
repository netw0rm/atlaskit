import * as React from 'react';
import { PureComponent } from 'react';
import { ColHeaderButton } from './styles';

export class ColHeaderButtonWrap extends PureComponent<{col: number; onClick: Function;}, {}> {
  handleClick = () => this.props.onClick(this.props.col);

  render () {
    return (
      <ColHeaderButton onClick={this.handleClick} />
    );
  }
}
