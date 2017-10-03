// @flow
import React, { PureComponent } from 'react';
import Layer from '@atlaskit/layer';
import { getLayerPosition } from '../utils';
import Div, { TooltipTrigger } from '../styled/Tooltip';
import { Slide } from './Animation';
import { ChildrenType, FunctionType, PositionType } from '../types';

const TransitionTip = props => <Slide component={Div} {...props} />;

type Props = {
  children: ChildrenType,
  description: string,
  isVisible: boolean,
  onMouseOut: FunctionType,
  onMouseOver: FunctionType,
  position: PositionType,
};

export default class TooltipStateless extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaultProps = {
    isVisible: false,
    onMouseOut: () => {},
    onMouseOver: () => {},
    position: 'bottom',
  }

  state = { isFlipped: false }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const { children, description, isVisible, onMouseOut, onMouseOver, position } = this.props;
    const { isFlipped } = this.state;

    const tooltip = isVisible ? (
      <TransitionTip in isFlipped={isFlipped} position={position}>
        {description}
      </TransitionTip>
    ) : null;

    return (
      <Layer
        autoPosition
        content={tooltip}
        onFlippedChange={this.handleLayerFlipChange}
        position={getLayerPosition(position)}
      >
        <TooltipTrigger onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          {children}
        </TooltipTrigger>
      </Layer>
    );
  }
}
