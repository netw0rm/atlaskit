import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from './XFlowProvider';
import InitializingSpinnerDiv from '../styled/InitializingSpinnerDiv';

class InitializingScreen extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    productLogo: PropTypes.element,
  };

  defaultProps = {
    isOpen: true,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.initializing-screen.displayed');
  }

  render() {
    const { productLogo } = this.props;
    return (
      <ModalDialog isOpen={this.props.isOpen} width="small" header={productLogo || <div />} footer={<div />}>
        <InitializingSpinnerDiv>
          <Spinner size="large" isCompleting={false} />
        </InitializingSpinnerDiv>
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
  withAnalytics(InitializingScreen),
  ({ xFlow }) => ({ productLogo: xFlow && xFlow.config.productLogo })
);
