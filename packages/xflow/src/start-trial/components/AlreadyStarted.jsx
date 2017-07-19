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

export class AlreadyStartedBase extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    getStartedButtonText: PropTypes.string,
    spinnerActive: PropTypes.bool,
    getStartedButtonDisabled: PropTypes.bool,
    goToProduct: PropTypes.func,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    getStartedButtonDisabled: this.props.getStartedButtonDisabled,
  };

  handleGetStartedClick = () => {
    const { goToProduct } = this.props;
    this.setState({
      spinnerActive: true,
      getStartedButtonDisabled: true,
    });
    goToProduct();
  };

  render() {
    const { productLogo, heading, message, getStartedButtonText } = this.props;

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
              onClick={this.handleGetStartedClick}
              appearance="primary"
              isDisabled={this.state.getStartedButtonDisabled}
            >
              {getStartedButtonText}
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
  AlreadyStartedBase,
  ({ crossSell: { config: { productLogo, startTrial }, goToProduct } }) => ({
    productLogo,
    heading: startTrial.alreadyStartedHeading,
    message: startTrial.alreadyStartedMessage,
    getStartedButtonText: startTrial.alreadyStartedGetStartedButtonText,
    goToProduct,
  })
);
