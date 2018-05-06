import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBarBackground from '../styled/ProgressBarBackground';
import ProgressBarValue from '../styled/ProgressBarValue';

export function toPercentage(progress) {
  // 0 <= progress <= 1
  // 0 <= percentage <= 100, calculated to 1 decimal place
  return `${(Math.min(Math.max(0, progress), 1) * 100).toFixed(1)}%`;
}

export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    indeterminate: PropTypes.bool,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    progress: 0,
    indeterminate: false,
    onComplete: () => {},
  };

  constructor(props) {
    super(props);
    const width = toPercentage(this.props.progress);

    // Set initial width before rendering occurs
    this.state = {
      width,
    };
  }

  componentDidMount() {
    if (this.state.width === toPercentage(1)) {
      this.props.onComplete();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { progress: oldProgress } = this.props;
    const { progress: newProgress } = nextProps;

    if (oldProgress !== newProgress) {
      const width = toPercentage(newProgress);
      this.setState({
        width,
      });
    }
  }

  render() {
    const { indeterminate } = this.props;
    const { width } = this.state;

    return (
      <ProgressBarBackground>
        {indeterminate
          ? null
          : <ProgressBarValue
            onTransitionEnd={() => {
              if (width === toPercentage(1)) {
                this.props.onComplete();
              }
            }}
            style={{
              width,
            }}
          />}
        <span aria-live="polite">
          {indeterminate ? '' : width}
        </span>
      </ProgressBarBackground>
    );
  }
}
