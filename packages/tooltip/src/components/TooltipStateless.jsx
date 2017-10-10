import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layer from '@atlaskit/layer';
import { getLayerPosition } from '../utils';
import Tip, { TooltipTarget } from '../styled/Tooltip';

export default class TooltipStateless extends PureComponent {
  static propTypes = {
    /** The content the tooltip will be displayed around. */
    children: PropTypes.node,
    /** The text to be displayed in the tooltip. */
    description: PropTypes.string,
    /** Set whether the tooltip is displayed or not. */
    isVisible: PropTypes.bool,
    /** Function to be called when a mouse enters the target. */
    onMouseLeave: PropTypes.func,
    /** Function to be called when a mouse leaves the target. */
    onMouseEnter: PropTypes.func,
    /** onMouseOver is depreacted. Use onMouseEnter instead */
    onMouseOver: PropTypes.func,
    /** onMouseOut is depreacted. Use onMouseLeave instead */
    onMouseOut: PropTypes.func,
    /** Where the tooltip should appear relative to its children. */
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    /**
      Component to be rendered around the child. Can be used to adjust the size
      and shape of the child. This will be passed the onMouseEnter and onMouseLeave
      props.
    */
    target: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    isVisible: false,
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    position: 'bottom',
    target: TooltipTarget,
  }

  state = { isFlipped: false }

  onMouseOver = (e) => {
    if (!this.props.onMouseOver) return null;
    // eslint-disable-next-line no-console
    console.warn('WARNING: onMouseOver() prop has been deprecated. This should be switched to onMouseEnter');
    return this.props.onMouseOver(e);
  }
  onMouseOut = (e) => {
    if (!this.props.onMouseOut) return null;
    // eslint-disable-next-line no-console
    console.warn('WARNING: onMouseOut() prop has been deprecated. This should be switched to onMouseLeave');
    return this.props.onMouseOut(e);
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const {
      children, description, isVisible, onMouseLeave, onMouseEnter, position,
      target: Target,
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
        <Target
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {children}
        </Target>
      </Layer>
    );
  }
}
