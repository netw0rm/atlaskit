import React, { PureComponent, PropTypes } from 'react';
import ResizerButtonInner from '../styled/ResizerButtonInner';

export default class ResizerButton extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    isPointingRight: PropTypes.bool,
    onClick: PropTypes.func,
  }
  render() {
    return (
      <ResizerButtonInner
        isVisible={this.props.isVisible}
        isPointingRight={this.props.isPointingRight}
        onMouseDown={e => e.preventDefault()}
        onClick={this.props.onClick}
        aria-expanded={!this.props.isPointingRight}
      />
    );
  }
}
