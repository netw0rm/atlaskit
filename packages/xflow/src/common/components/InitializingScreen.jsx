import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { withAnalytics } from '@atlaskit/analytics';

import InitializingSpinnerDiv from '../styled/InitializingSpinnerDiv';

class InitializingScreen extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
  };

  defaultProps = {
    isOpen: true,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.initializing-screen.displayed');
  }

  render() {
    return (
      <ModalDialog isOpen={this.props.isOpen} width="small" header={<div />} footer={<div />}>
        <InitializingSpinnerDiv>
          <Spinner size="large" isCompleting={false} />
        </InitializingSpinnerDiv>
      </ModalDialog>
    );
  }
}

export default withAnalytics(InitializingScreen);
