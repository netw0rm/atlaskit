// @flow
import React, { PureComponent } from 'react';
import TooltipStateless from './TooltipStateless';
import { ChildrenType, PositionType } from '../types';

type Props = {
  children: ChildrenType,
  description: string,
  position: PositionType,
};

export default class Tooltip extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaultProps = { position: 'bottom' }

  state = { isVisible: false }

  hideTooltip = () => this.setState({ isVisible: false });
  showTooltip = () => this.setState({ isVisible: true });

  render() {
    const { children, description, position } = this.props;
    const { isVisible } = this.state;

    return (
      <TooltipStateless
        description={description}
        isVisible={isVisible}
        onMouseOut={this.hideTooltip}
        onMouseOver={this.showTooltip}
        position={position}
      >
        {children}
      </TooltipStateless>
    );
  }
}
