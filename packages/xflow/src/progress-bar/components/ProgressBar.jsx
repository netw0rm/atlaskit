import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBarBackground from '../styled/ProgressBarBackground';
import ProgressBarValue from '../styled/ProgressBarValue';

function calculateWidth(progress) {
  // 0 <= progress <= 1
  // 0% <= width <= 100%
  return `${Math.min(Math.max(0, progress), 1) * 100}%`;
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

    // Set initial width before rendering occurs
    this.state = {
      width: calculateWidth(this.props.progress),
    };
  }

  componentDidMount() {
    if (this.state.width === '100%') {
      this.props.onComplete();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.progress !== nextProps.progress) {
      this.setState({
        width: calculateWidth(nextProps.progress),
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
              if (width === '100%') {
                this.props.onComplete();
              }
            }}
            style={{
              width,
            }}
          />}
      </ProgressBarBackground>
    );
  }
}
