import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layer from '@atlaskit/layer';
import { getLayerPosition } from '../utils';
import Tip, { TooltipTrigger } from '../styled/Tooltip';

export default class TooltipStateless extends PureComponent {
  static propTypes = {
    /** The content the tooltip will be displayed around. */
    children: PropTypes.node,
    /** The text to be displayed in the tooltip. */
    description: PropTypes.string,
    /** Set whether the tooltip is displayed or not. */
    isVisible: PropTypes.bool,
    /** Function to be called when a mouse enters the trigger. */
    onMouseLeave: PropTypes.func,
    /** Function to be called when a mouse leaves the trigger. */
    onMouseEnter: PropTypes.func,
    /** Where the tooltip should appear relative to its children. */
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    /**
      Component to be rendered around the child. Can be used to adjust the size
      and shape of the child.
    */
    trigger: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    isVisible: false,
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    position: 'bottom',
    trigger: TooltipTrigger,
  }

  state = { isFlipped: false }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const {
      children, description, isVisible, onMouseLeave, onMouseEnter, position,
      trigger: Trigger,
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
        <Trigger onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {children}
        </Trigger>
      </Layer>
    );
  }
}
