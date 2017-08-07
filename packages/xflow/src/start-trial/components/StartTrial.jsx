import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import { MultiStep, Step } from '../../multi-step';
import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

import { DEACTIVATED, INACTIVE } from '../../common/productProvisioningStates';

class StartTrial extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    status: PropTypes.oneOf([INACTIVE, DEACTIVATED]),
    onComplete: PropTypes.func,
    onTrialActivating: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
    onTrialActivating: () => {},
  };

  render() {
    const { status, onComplete, onTrialActivating, firePrivateAnalyticsEvent } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <ConfirmTrial
              onComplete={async () => {
                await onTrialActivating();
                // TODO: We need to capture failures from hasProductBeenEvaluated check.
                if (status === DEACTIVATED) {
                  firePrivateAnalyticsEvent('xflow.start-trial.previously-evaluated.true.skipping-grant-access');
                } else {
                  firePrivateAnalyticsEvent('xflow.start-trial.previously-evaluated.false.showing-grant-access');
                }
                nextStep(status === DEACTIVATED ? 2 : 1);
              }}
              onCancel={cancel}
            />}
        />
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={() => nextStep} />} />
      </MultiStep>
    );
  }
}

export const StartTrialBase = withAnalytics(StartTrial);

export default withXFlowProvider(StartTrialBase, ({ xFlow: { status } }) => ({
  status,
}));
