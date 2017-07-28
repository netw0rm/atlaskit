import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withXFlowProvider } from '../../common/components/XFlowProvider';

import ProgressIndicator from './ProgressIndicator';
import { ACTIVE, ACTIVATING, INACTIVE, UNKNOWN } from '../../common/productProvisioningStates';

export class AlreadyStartedBase extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    getStartedButtonText: PropTypes.string,
    spinnerActive: PropTypes.bool,
    getStartedButtonDisabled: PropTypes.bool,
    goToProduct: PropTypes.func,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, UNKNOWN]).isRequired,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    getStartedButtonDisabled: this.props.getStartedButtonDisabled,
    initialActivationState: this.props.status,
  };

  handleGetStartedClick = () => {
    const { goToProduct } = this.props;
    this.setState({
      spinnerActive: true,
      getStartedButtonDisabled: true,
    });
    goToProduct();
  };

  handleProgressComplete = () => {
    this.setState({
      isReady: true,
    });
  };

  handleProgressComplete = () => {
    this.setState({
      isReady: true,
    });
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
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              onClick={this.handleGetStartedClick}
              appearance="primary"
              isDisabled={this.state.getStartedButtonDisabled}
            >
              {getStartedButtonText}
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
  ({ xFlow: { config: { productLogo, startTrial }, goToProduct, progress, status } }) => ({
    productLogo,
    heading: startTrial.alreadyStartedHeading,
    message: startTrial.alreadyStartedMessage,
    getStartedButtonText: startTrial.alreadyStartedGetStartedButtonText,
    goToProduct,
    progress,
    status,
  })
);
