import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';

import ModalDialog from '@atlaskit/modal-dialog';
import ProgressBar from './ProgressBar';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';

import { withCrossSellProvider, crossSellShape } from '../../common/components/CrossSellProvider';

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    crossSell: crossSellShape,
  };

  static contextTypes = crossSellShape;

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={this.context.crossSell.productLogo}
        footer={
          <StartTrialFooter>
            <Button isDisabled={this.props.crossSell.state.progress === undefined || this.props.crossSell.state.progress < 100} onClick={this.props.onComplete} appearance="primary">Go to Confluence</Button>
            <Button onClick={this.props.onComplete} appearance="subtle-link" >Close</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>You are almost there...</StartTrialHeader>
          <ProgressBar progress={this.props.progress} />
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(LoadingTimeBase, context => context);
