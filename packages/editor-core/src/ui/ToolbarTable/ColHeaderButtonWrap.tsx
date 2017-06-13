import * as React from 'react';
import { PureComponent } from 'react';
import { ColHeaderButton } from './styles';
import { Node } from '../../prosemirror';

export class ColHeaderButtonWrap extends PureComponent<{col: number; onClick: Function; tableNode?: Node}, {}> {
  handleClick = () => this.props.onClick(this.props.col, this.props.tableNode);

  render () {
    return (
      <ColHeaderButton onClick={this.handleClick} />
    );
  }
}
