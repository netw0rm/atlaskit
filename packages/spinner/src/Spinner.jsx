import React, { PureComponent, PropTypes } from 'react';

import Container from './styled/Container';
import Dash from './styled/Dash';
import Wrapper from './styled/Wrapper';

// time in milliseconds to wait before displaying the loading spinner
const SPINNER_DELAY = 100;
const SIZES = ['small', 'medium', 'large', 'xlarge'];
const SIZES_MAP = {
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
};
const DEFAULT_SIZE = SIZES_MAP.small;
const NOOP = () => {};

export default class Spinner extends PureComponent {
  static propTypes = {
    isCompleting: PropTypes.bool,
    onComplete: PropTypes.func,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(SIZES),
    ]),
  }

  static defaultProps = {
    isCompleting: false,
    onComplete: NOOP,
    size: SIZES[0],
  }

  state = {
    spinnerDelayTimeout: null,
    spinnerHiddenForDelay: true,
  };

  componentDidMount() {
    if (!this.props.isCompleting) {
      this.showSpinnerAfterDelay();
    }
  }
  componentWillReceiveProps(nextProps) {
    // if we werent displaying the spinner and now we are
    if (this.props.isCompleting && !nextProps.isCompleting) {
      this.showSpinnerAfterDelay();
    }
  }
  componentWillUnmount() {
    if (this.state.spinnerDelayTimeout) {
      clearTimeout(this.state.spinnerDelayTimeout);
    }
  }

  showSpinnerAfterDelay = () => {
    if (this.state.spinnerDelayTimeout) {
      clearTimeout(this.state.spinnerDelayTimeout);
    }
    this.setState({
      spinnerDelayTimeout: setTimeout(this.handleSpinnerDelayEnd, SPINNER_DELAY),
      spinnerHiddenForDelay: true,
    });
  }
  handleSpinnerDelayEnd = () => {
    this.setState({ spinnerHiddenForDelay: false });
  }
  handleTransitionEnd = (e) => {
    // we have to check that props.isCompleting as a transitionEnd event will be fired when starting
    // up and winding down. This could lead to a case where a spinner starts completing and is then
    // sets isCompleting="false" in which case onComplete will not be called, which is expected
    // behaviour (the transition did not complete).
    if (e.propertyName === 'stroke-dashoffset' && this.props.isCompleting) {
      this.props.onComplete();
    }
  }
  validateSize = () => {
    const { size } = this.props;
    let spinnerSize = SIZES_MAP[size] || size;
    if (typeof spinnerSize !== 'number') spinnerSize = DEFAULT_SIZE;

    return spinnerSize;
  }

  render() {
    const { isCompleting } = this.props;
    const size = this.validateSize();
    const strokeWidth = Math.round(size / 10);
    const strokeRadius = (size / 2) - (strokeWidth / 2);
    const circumference = Math.PI * strokeRadius * 2;
    const dimensions = { height: size, width: size };
    const dashStyles = {
      strokeDashoffset: isCompleting ? circumference : 0.8 * circumference,
      strokeDasharray: circumference,
    };

    return (
      <Container
        active={!isCompleting}
        hidden={this.state.spinnerHiddenForDelay}
        onTransitionEnd={this.handleTransitionEnd}
        style={dimensions}
      >
        <Wrapper>
          <svg
            {...dimensions}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${size} ${size}`}
          >
            <Dash
              active={!isCompleting}
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={strokeRadius}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              style={dashStyles}
            />
          </svg>
        </Wrapper>
      </Container>
    );
  }
}
