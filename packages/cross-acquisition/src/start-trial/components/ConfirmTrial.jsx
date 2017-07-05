import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';

import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialDialog from '../styled/StartTrialDialog';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

export class ConfirmTrialBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
  };

  handleConfirmClick = () => {
    this.props.onComplete();
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
            <Button onClick={this.handleConfirmClick} appearance="primary">Confirm</Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">Cancel</Button>
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
