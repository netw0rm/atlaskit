import React, { PureComponent, PropTypes } from 'react';

import Container from './styled/Container';
import Dash from './styled/Dash';
import Wrapper from './styled/Wrapper';

// time in milliseconds to wait before displaying the loading spinner
const DEFAULT_SPINNER_DELAY = 100;
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
    /** Time in milliseconds after component mount before spinner is visible. */
    delay: PropTypes.number,
    /** Set the spinner color to white, for use in dark-themed UIs. */
    invertColor: PropTypes.bool,
    /** Setting this to true causes the spinner to animate its disappearance.
    Setting it to false again will cause the spinner to animate back in. */
    isCompleting: PropTypes.bool,
    /** Handler for once the spinner has completed its outro animation */
    onComplete: PropTypes.func,
    /** Size of the spinner. */
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(SIZES),
    ]),
  }

  static defaultProps = {
    delay: DEFAULT_SPINNER_DELAY,
    invertColor: false,
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
      spinnerDelayTimeout: setTimeout(this.handleSpinnerDelayEnd, this.props.delay),
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
    // "active" means that the spinner is actually spinning (this happens after the delay of setting
    // "isCompleting")
    const spinnerIsActive = !isCompleting && !this.state.spinnerHiddenForDelay;

    return (
      <Container
        active={spinnerIsActive}
        hidden={this.state.spinnerHiddenForDelay}
        onTransitionEnd={this.handleTransitionEnd}
        style={dimensions}
      >
        <Wrapper>
          <svg
            {...dimensions}
            focusable="false"
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <Dash
              active={spinnerIsActive}
              cx={size / 2}
              cy={size / 2}
              fill="none"
              invertColor={this.props.invertColor}
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
