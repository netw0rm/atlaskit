import React, { Component } from 'react';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';
import SiteChecker from '../../common/utils/SiteChecker';

export class StartTrialBase extends Component {
  constructor() {
    super();
    this.siteChecker = new SiteChecker();
    this.startCheckingSite();
  }

  componentWillUnmount() {
    this.siteChecker.stop();
  }

  startCheckingSite() {
    this.siteChecker.start((progress) => {
      this.setState({ progress });
    });
  }

  render() {
    return (
      <MultiStep start={0}>
        <Step
          render={(nextStep, cancel) => <ConfirmTrial onComplete={nextStep} onCancel={cancel} />}
        />
        <Step
          render={nextStep => <GrantAccess onComplete={nextStep} progress={this.state.progress} />}
        />
        <Step
          render={nextStep => <LoadingTime onComplete={nextStep} progress={this.state.progress} />}
        />
      </MultiStep>
    );
  }
}

export default withCrossSellProvider(StartTrialBase);
