import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';

import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialDialog from '../styled/StartTrialDialog';

import { withCrossSellProvider, crossSellShape } from '../../common/components/CrossSellProvider';

export class ConfirmTrialBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    crossSell: crossSellShape,
  };

  handleConfirmClick = () => {
    this.props.onComplete();
  };

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={this.props.crossSell.config.productLogo}
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleConfirmClick} appearance="primary">Confirm</Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">Cancel</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            {this.props.crossSell.config.startTrial.confirmHeader}
          </StartTrialHeader>
          {React.isValidElement(this.props.crossSell.config.startTrial.confirmMessage)
            ? this.props.crossSell.config.startTrial.confirmMessage
            : <p>{this.props.crossSell.config.startTrial.confirmMessage}</p>}
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(ConfirmTrialBase, context => context);
