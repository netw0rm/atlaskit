import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import { MultiStep, Step } from '../../common/components/multi-step';
import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

class StartTrial extends Component {
  static propTypes = {
    showGrantAccess: PropTypes.bool.isRequired,
    isCrossSell: PropTypes.bool,
    onComplete: PropTypes.func,
    onTrialActivating: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onComplete: () => {},
    onTrialActivating: () => {},
    isCrossSell: false,
  };

  render() {
    const {
      showGrantAccess,
      onComplete,
      onTrialActivating,
      firePrivateAnalyticsEvent,
      isCrossSell,
    } = this.props;
    return (
      <MultiStep onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <ConfirmTrial
              onComplete={async () => {
                await onTrialActivating();
                if (showGrantAccess) {
                  firePrivateAnalyticsEvent('xflow.start-trial.previously-evaluated.false.showing-grant-access');
                } else {
                  firePrivateAnalyticsEvent('xflow.start-trial.previously-evaluated.true.skipping-grant-access');
                }
                nextStep(showGrantAccess ? 1 : 2);
              }}
              onCancel={cancel}
              isCrossSell={isCrossSell}
            />}
        />
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export const StartTrialBase = withAnalytics(StartTrial);

export default withXFlowProvider(StartTrialBase);
