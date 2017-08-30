import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { colors } from '@atlaskit/theme';

import ProgressBarContainer from '../styled/ProgressBarContainer';
import ProgressBarIconDiv from '../styled/ProgressBarIconDiv';
import ProgressBar from '../../common/components/ProgressBar';

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
          ? <CheckCircleIcon label="Complete" primaryColor={colors.G300} />
          : <CrossCircleIcon label="Error" primaryColor={colors.R300} />;
    }

    return (
      <ProgressBarContainer showIcon={showIcon}>
        <ProgressBar
          progress={progress}
          indeterminate={showIcon && status !== ACTIVE}
          onComplete={this.handleProgressComplete}
        />
        <ProgressBarIconDiv>
          {icon}
        </ProgressBarIconDiv>
      </ProgressBarContainer>
    );
  }
}
