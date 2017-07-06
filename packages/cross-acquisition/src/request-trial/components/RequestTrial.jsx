import React, { Component } from 'react';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';
import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

import { MultiStep, Step } from '../../multi-step';

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
