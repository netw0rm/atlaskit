import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../common/components/multi-step';

import ConfirmRequest from './ConfirmRequest';
import RequestTrialNote from './RequestTrialNote';

class RequestTrial extends Component {
  static propTypes = {
    alreadyRequested: PropTypes.bool.isRequired,
    isCrossSell: PropTypes.bool,

    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string,
      contextualMessage: PropTypes.string,
      reactivateCTA: PropTypes.string,
      trialCTA: PropTypes.string,
    }),

    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    alreadyRequested: false,
    onComplete: () => {},
    onTrialRequested: () => {},
  };

  render() {
    const {
      alreadyRequested,
      contextInfo,
      firePrivateAnalyticsEvent,
      isCrossSell,
      onComplete,
      onTrialRequested,
    } = this.props;

    return (
      <MultiStep onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) => (
            <ConfirmRequest
              alreadyRequested={alreadyRequested}
              contextInfo={contextInfo}
              onComplete={async () => {
                if (alreadyRequested) {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.true');
                  // If the trial was already requested, then the CTA which made us arrive here
                  // was not a CTA to request a trial.
                  // Skip the next step.
                  nextStep(2);
                } else {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.false');
                  await onTrialRequested();
                  nextStep();
                }
              }}
              onCancel={cancel}
            />
          )}
        />
        <Step
          render={nextStep => <RequestTrialNote isCrossSell={isCrossSell} onComplete={nextStep} />}
        />
      </MultiStep>
    );
  }
}

export const RequestTrialBase = withAnalytics(RequestTrial);

export default withXFlowProvider(RequestTrialBase);
