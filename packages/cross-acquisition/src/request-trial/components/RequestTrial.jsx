import React, { Component } from 'react';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

import { MultiStep, Step } from '../../multi-step';

import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

export class RequestTrialBase extends Component {
  render() {
    return (
      <MultiStep start={0}>
        <Step
          render={(nextStep, cancel) =>
            <RequestTrialAccess onComplete={nextStep} onCancel={cancel} />}
        />
        <Step render={nextStep => <RequestTrialNote onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export default withCrossSellProvider(RequestTrialBase);
