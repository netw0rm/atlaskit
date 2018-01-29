import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import { MultiStep, Step } from '../../common/components/multi-step';
import ContextualConfirmTrial from './ContextualConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

class ContextualStartTrial extends Component {
  static propTypes = {
    showGrantAccess: PropTypes.bool.isRequired,
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string.isRequired,
      contextualMessage: PropTypes.string.isRequired,
      reactivateCTA: PropTypes.string.isRequired,
      trialCTA: PropTypes.string.isRequired,
    }).isRequired,

    onComplete: PropTypes.func,
    onTrialActivating: PropTypes.func,
    isCrossSell: PropTypes.bool,

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
      contextInfo,
      isCrossSell,
    } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <ContextualConfirmTrial
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
              contextInfo={contextInfo}
              isCrossSell={isCrossSell}
            />}
        />
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export const ContextualStartTrialBase = withAnalytics(ContextualStartTrial);

export default withXFlowProvider(ContextualStartTrialBase);
