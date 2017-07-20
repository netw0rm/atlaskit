import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';
import SiteChecker from '../../common/utils/SiteChecker';

export class StartTrialBase extends Component {
  static propTypes = {
    hasProductBeenEvaluated: PropTypes.func.isRequired,
  };

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
    const { hasProductBeenEvaluated } = this.props;
    return (
      <MultiStep start={0}>
        <Step
          render={(nextStep, cancel) =>
            <ConfirmTrial
              onComplete={async () => {
                const evalStatus = await hasProductBeenEvaluated();
                nextStep(evalStatus ? 2 : 1);
              }}
              onCancel={cancel}
            />}
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

export default withXFlowProvider(StartTrialBase, ({ xFlow: { hasProductBeenEvaluated } }) => ({
  hasProductBeenEvaluated,
}));
