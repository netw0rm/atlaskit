import React, { PureComponent, PropTypes } from 'react';
import ResizerButtonInner from '../styled/ResizerButtonInner';

export default class ResizerButton extends PureComponent {
  static propTypes = {
    isPointingRight: PropTypes.bool,
    onClick: PropTypes.func,
  }
  render() {
    return (
      <ResizerButtonInner
        aria-expanded={!this.props.isPointingRight}
        isPointingRight={this.props.isPointingRight}
        onClick={this.props.onClick}
        onMouseDown={e => e.preventDefault()}
      />
    );
  }
}
