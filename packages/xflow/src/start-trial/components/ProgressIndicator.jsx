import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

import ProgressBarContainer from '../styled/ProgressBarContainer';
import ProgressBar from '../../progress-bar/components/ProgressBar';

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../common/productProvisioningStates';

export default class ProgressIndicator extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]).isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
  };

  state = {
    showIcon: false,
  };

  handleProgressComplete = () => {
    this.setState({
      showIcon: true,
    });
    this.props.onComplete();
  };

  render() {
    const { progress, status } = this.props;
    const { showIcon } = this.state;

    let icon = null;
    if (showIcon) {
      icon =
        status === ACTIVE
          ? <CheckCircleIcon label="Complete" primaryColor="#36B37E" />
          : <CrossCircleIcon label="Error" primaryColor="#FF5630" />;
    }

    return (
      <ProgressBarContainer showIcon={showIcon}>
        <ProgressBar progress={progress} onComplete={this.handleProgressComplete} />
        {icon}
      </ProgressBarContainer>
    );
  }
}
