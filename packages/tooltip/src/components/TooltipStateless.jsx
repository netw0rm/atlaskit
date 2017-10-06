import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layer from '@atlaskit/layer';
import { getLayerPosition } from '../utils';
import Tip, { TooltipTrigger } from '../styled/Tooltip';

export default class TooltipStateless extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    isVisible: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  }

  static defaultProps = {
    isVisible: false,
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    position: 'bottom',
  }

  state = { isFlipped: false }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const {
      children, description, isVisible, onMouseLeave, onMouseEnter, position,
    } = this.props;
    const { isFlipped } = this.state;
    const tooltip = isVisible ? (
      <Tip isFlipped={isFlipped} position={position}>
        {description}
      </Tip>
    ) : null;

    return (
      <Layer
        autoPosition
        content={tooltip}
        onFlippedChange={this.handleLayerFlipChange}
        position={getLayerPosition(position)}
      >
        <TooltipTrigger onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {children}
        </TooltipTrigger>
      </Layer>
    );
  }
}
