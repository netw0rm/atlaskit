import React, { PureComponent, PropTypes } from 'react';
import Layer from '@atlaskit/layer';

import styles from 'style!./styles.less';
import { positionToPopperPosition, getAnimationClass } from './internal/helpers';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

/* eslint-disable react/no-unused-prop-types */

export default class StatelessTooltip extends PureComponent {
  static propTypes = {
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    description: PropTypes.string,
    visible: PropTypes.bool,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: 'bottom',
    description: '',
    visible: false,
    onMouseOver: () => {},
    onMouseOut: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const props = this.props;
    const animationClass = getAnimationClass(props.position, this.state.isFlipped);
    const content = props.visible ?
      (<div className={`${styles.tooltip} ${animationClass}`}>{props.description}</div>) :
      null;

    return (
      <div onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
        <Layer
          position={positionToPopperPosition(props.position)}
          autoPosition
          content={content}
          onFlippedChange={this.handleLayerFlipChange}
        >
          {this.props.children}
        </Layer>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
