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
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string,
      contextualMessage: PropTypes.string,
      reactivateCTA: PropTypes.string,
      trialCTA: PropTypes.string,
    }),
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
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
      onComplete,
      onTrialRequested,
    } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <ConfirmRequest
              alreadyRequested={alreadyRequested}
              contextInfo={contextInfo}
              onComplete={async () => {
                await onTrialRequested();
                if (alreadyRequested) {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.true');
                } else {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.false');
                }
                nextStep();
              }}
              onCancel={cancel}
            />}
        />
        <Step render={nextStep => <RequestTrialNote onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export const RequestTrialBase = withAnalytics(RequestTrial);

export default withXFlowProvider(RequestTrialBase);
