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
    onComplete: PropTypes.func.isRequired,
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    confirmButtonDisabled: this.props.confirmButtonDisabled,
  }

  handleConfirmClick = () => {
    this.setState({ spinnerActive: true, confirmButtonDisabled: true });
    // Mock starting trial
    setTimeout(() => {
      this.props.onComplete();
    }, 1500);
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
            <Button onClick={this.handleConfirmClick} appearance="primary" isDisabled={this.state.confirmButtonDisabled}>
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
  ({ crossSell: { config: { productLogo, startTrial } } }) => ({
    productLogo,
    heading: startTrial.confirmHeader,
    message: startTrial.confirmMessage,
  })
);
