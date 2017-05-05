import React, { PropTypes, PureComponent } from 'react';

import AkSpinner from '@atlaskit/spinner';
import { CrossIcon } from '@atlaskit/icon';

const DEFAULT_DELAY = 500;

export default class SpinningClearIcon extends PureComponent {
  static propTypes = {
    shouldSpin: PropTypes.bool,
    delay: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSpinning: props.shouldSpin || false,
      isUnderMouse: false,
    };
    this.delayTimeoutId = null;
  }

  componentDidMount() {
    this.handleDelayedSpinner();
  }

  componentDidUpdate() {
    this.handleDelayedSpinner();
  }

  componentWillUnmount() {
    this.clearDelayedSpinner();
  }

  setupDelayedSpinner() {
    const delay = this.props.delay || DEFAULT_DELAY;

    this.delayTimeoutId = setTimeout(() => {
      this.setState({ isSpinning: true });
    }, delay);
  }

  clearDelayedSpinner() {
    clearTimeout(this.delayTimeoutId);
    this.delayTimeoutId = null;
  }

  handleDelayedSpinner() {
    if (!this.state.isSpinning && this.props.shouldSpin) {
      this.setupDelayedSpinner();
    } else if (!this.props.shouldSpin) {
      this.clearDelayedSpinner();
      this.setState({ isSpinning: false });
    }
  }

  handleMouseEnter = () => {
    this.setState({ isUnderMouse: true });
  }

  handleMouseLeave = () => {
    this.setState({ isUnderMouse: false });
  }

  render() {
    return (
      <div
        style={{ display: 'inherit' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {
          (this.state.isSpinning && !this.state.isUnderMouse)
            ? <AkSpinner />
            : <CrossIcon label="Clear search" />
        }
      </div>
    );
  }
}
