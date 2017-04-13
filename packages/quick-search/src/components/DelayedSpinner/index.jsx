import React, { PropTypes, PureComponent } from 'react';
import { CrossIcon } from '@atlaskit/icon';
import AkSpinner from '@atlaskit/spinner';

export default class DelayedSpinner extends PureComponent {
  static propTypes = {
    delay: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      isWaitingToSpin: true,
      isUnderMouse: false,
    };
  }

  componentDidMount() {
    this.delayTimeoutId = setTimeout(() => {
      this.setState({ isWaitingToSpin: false });
    }, this.props.delay || 300);
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimeoutId);
    this.delayTimeoutId = null;
  }

  handleMouseEnter = () => {
    this.setState({ isUnderMouse: true });
  }

  handleMouseLeave = () => {
    this.setState({ isUnderMouse: false });
  }

  render() {
    return (
      <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {!this.state.isWaitingToSpin && !(this.state.isUnderMouse)
          ? <AkSpinner />
          : <CrossIcon label="Clear search" />}
      </div>
    );
  }
}
