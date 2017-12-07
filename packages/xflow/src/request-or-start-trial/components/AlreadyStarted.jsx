import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import SpinnerDiv from '../../common/styled/SpinnerDiv';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withXFlowProvider } from '../../common/components/XFlowProvider';

import ProgressIndicator from './ProgressIndicator';
import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../common/productProvisioningStates';

class AlreadyStarted extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    getStartedButtonText: PropTypes.string,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]).isRequired,
    initialStatus: PropTypes.oneOf([ACTIVE, ACTIVATING]),

    onComplete: PropTypes.func.isRequired,
    goToProduct: PropTypes.func,
    closeAlreadyStartedDialog: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    startProductTrial: () => {},
    closeAlreadyStartedDialog: () => {},
  };

  state = {
    isLoading: false,
    initialActivationState: this.props.initialStatus || this.props.status,
    isReady: this.props.status === ACTIVE,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.already-started.displayed');
  }

  handleProgressComplete = () => {
    const { status, firePrivateAnalyticsEvent } = this.props;
    if (status === ACTIVE) {
      this.setState({
        isReady: true,
      });
      firePrivateAnalyticsEvent('xflow.already-started.loading.finished');
    }
  };

  handleCloseClick = async () => {
    const { closeAlreadyStartedDialog, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.already-started.close-button.clicked');
    await closeAlreadyStartedDialog();
    return onComplete();
  };

  handleGetStartedClick = async () => {
    const { goToProduct, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.already-started.go.to.product');
    this.setState({
      isLoading: true,
    });
    await goToProduct();
    return onComplete();
  };

  render() {
    const { productLogo, heading, message, getStartedButtonText, progress, status } = this.props;
    const { initialActivationState, isReady, isLoading } = this.state;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <div>
            {productLogo}
            {initialActivationState === ACTIVATING
              ? <ProgressIndicator
                progress={progress}
                status={status}
                onComplete={this.handleProgressComplete}
              />
              : null}
          </div>
        }
        footer={
          <StartTrialFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!isLoading} />
            </SpinnerDiv>
            <Button
              onClick={this.handleGetStartedClick}
              appearance="primary"
              isDisabled={!isReady || isLoading}
            >
              {getStartedButtonText}
            </Button>
            <Button onClick={this.handleCloseClick} appearance="subtle-link">
              <FormattedMessage
                id="xflow.generic.alread-started.close-button"
                defaultMessage="Close"
              />
            </Button>
          </StartTrialFooter>
        }
      >
        <div id="xflow-already-started">
          <StartTrialHeader>
            {heading}
          </StartTrialHeader>
          {message}
        </div>
      </ModalDialog>
    );
  }
}

export const AlreadyStartedBase = withAnalytics(AlreadyStarted);

export default withXFlowProvider(
  AlreadyStartedBase,
  ({
    xFlow: {
      config: { productLogo, startTrial },
      goToProduct,
      closeAlreadyStartedDialog,
      progress,
      status,
    },
  }) => ({
    productLogo,
    heading: startTrial.alreadyStartedHeading,
    message: startTrial.alreadyStartedMessage,
    getStartedButtonText: startTrial.alreadyStartedGetStartedButtonText,
    goToProduct,
    closeAlreadyStartedDialog,
    progress,
    status,
  })
);
