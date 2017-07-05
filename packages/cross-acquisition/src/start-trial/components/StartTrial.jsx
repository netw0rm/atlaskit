import React, { Component } from 'react';

import { withCrossSellProvider, crossSellShape } from '../../common/components/CrossSellProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

export class StartTrialBase extends Component {
  static propTypes = {
    crossSell: crossSellShape,
  };

  render() {
    return (
      <MultiStep start={0}>
        <Step render={nextStep => <ConfirmTrial onComplete={nextStep} />} />
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export default withCrossSellProvider(StartTrialBase, () => ({}));
