import React, { Component } from 'react';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

export class StartTrialBase extends Component {
  render() {
    return (
      <MultiStep start={0}>
        <Step
          render={(nextStep, cancel) => <ConfirmTrial onComplete={nextStep} onCancel={cancel} />}
        />
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export default withCrossSellProvider(StartTrialBase);
