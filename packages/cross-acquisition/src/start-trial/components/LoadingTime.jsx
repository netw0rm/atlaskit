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
    progress: PropTypes.number,
    productLogo: PropTypes.node,
    heading: PropTypes.string,
    completeHeading: PropTypes.string,
  };

  static contextTypes = crossSellShape;

  render() {
    const { productLogo, progress, heading, completeHeading, onComplete } = this.props;

    const isReady = progress === 100;
    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
          <StartTrialFooter>
            <Button isDisabled={!isReady} onClick={onComplete} appearance="primary">
              Go to Confluence
            </Button>
            <Button onClick={onComplete} appearance="subtle-link">Close</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            {isReady ? completeHeading : heading}
          </StartTrialHeader>
          <ProgressBar progress={progress} />
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  LoadingTimeBase,
  ({ crossSell: { config: { productLogo, startTrial }, state: { progress } } }) => ({
    productLogo,
    heading: startTrial.loadingHeading,
    completeHeading: startTrial.loadingCompleteHeading,
    progress,
  })
);
