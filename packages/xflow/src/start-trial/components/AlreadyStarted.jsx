import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage } from 'react-intl';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
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

export class AlreadyStartedBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    getStartedButtonText: PropTypes.string,
    goToProduct: PropTypes.func,
    closeAlreadyStartedDialog: PropTypes.func,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]).isRequired,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    isLoading: false,
    initialActivationState: this.props.status,
    isReady: this.props.status === ACTIVE,
  };

  handleProgressComplete = () => {
    this.setState({
      isReady: true,
    });
  };

  handleCloseClick = async () => {
    // this.props.firePrivateAnalyticsEvent('xflow.loading.screen.close');
    const { closeAlreadyStartedDialog, onComplete } = this.props;
    await closeAlreadyStartedDialog();
    return onComplete();
  };

  handleGetStartedClick = async () => {
    const { goToProduct, onComplete } = this.props;
    this.setState({
      isLoading: true,
    });
    await goToProduct();
    onComplete();
  };

  render() {
    const { productLogo, heading, message, getStartedButtonText, progress, status } = this.props;
    const { initialActivationState } = this.state;

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
              <Spinner isCompleting={!this.state.isLoading} />
            </SpinnerDiv>
            <Button
              onClick={this.handleGetStartedClick}
              appearance="primary"
              isDisabled={!this.state.isReady || this.state.isLoading}
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
        <StartTrialDialog id="xflow-already-started">
          <StartTrialHeader>
            {heading}
          </StartTrialHeader>
          {React.isValidElement(message)
            ? message
            : <p>
              {message}
            </p>}
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

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
