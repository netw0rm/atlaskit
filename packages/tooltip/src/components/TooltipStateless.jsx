import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layer from '@atlaskit/layer';
import { getLayerPosition } from '../utils';
import Tip from '../styled/Tooltip';

export default class TooltipStateless extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    isVisible: PropTypes.bool,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  }

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
      <Tip isFlipped={isFlipped} position={position}>
        {description}
      </Tip>
    ) : null;

    return (
      <span onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <Layer
          autoPosition
          content={tooltip}
          onFlippedChange={this.handleLayerFlipChange}
          position={getLayerPosition(position)}
        >
          {children}
        </Layer>
      </span>
    );
  }
}
