import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

export class ConfirmTrialBase extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    confirmButtonDisabled: this.props.confirmButtonDisabled,
  };

  handleConfirmClick = () => {
    const { startProductTrial, onComplete } = this.props;
    this.setState({
      spinnerActive: true,
      confirmButtonDisabled: true,
    });
    Promise.resolve(startProductTrial()).then(onComplete);
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel } = this.props;
    Promise.resolve(cancelStartProductTrial()).then(onCancel);
  };

  render() {
    const { productLogo, heading, message } = this.props;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
          <StartTrialFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              onClick={this.handleConfirmClick}
              appearance="primary"
              isDisabled={this.state.confirmButtonDisabled}
            >
              Confirm
            </Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">
              Cancel
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            {heading}
          </StartTrialHeader>
          {React.isValidElement(message) ? message : <p>{message}</p>}
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  ConfirmTrialBase,
  ({
    crossSell: { config: { productLogo, startTrial }, startProductTrial, cancelStartProductTrial },
  }) => ({
    productLogo,
    heading: startTrial.confirmHeader,
    message: startTrial.confirmMessage,
    startProductTrial,
    cancelStartProductTrial,
  })
);
