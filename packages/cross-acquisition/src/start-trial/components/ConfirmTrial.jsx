import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';

import { crossSellShape } from '../../common/components/CrossSellProvider';

import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialDialog from '../styled/StartTrialDialog';

export default class ConfirmTrial extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  static contextTypes = crossSellShape;

  handleConfirmClick = () => {
    this.props.onComplete();
  }

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={this.context.crossSell.productLogo}
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleConfirmClick} appearance="primary">Confirm</Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link" >Cancel</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>{this.context.crossSell.startTrial.confirmHeader}</StartTrialHeader>
          {React.isValidElement(this.context.crossSell.startTrial.confirmMessage)
            ? this.context.crossSell.startTrial.confirmMessage
            : <p>{this.context.crossSell.startTrial.confirmMessage}</p>
          }
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}
