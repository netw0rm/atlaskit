import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../common/components/multi-step';

import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

class RequestTrial extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    alreadyRequested: PropTypes.bool.isRequired,
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
      firePrivateAnalyticsEvent,
      onComplete,
      onTrialRequested,
    } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <RequestTrialAccess
              onComplete={async () => {
                await onTrialRequested();
                if (alreadyRequested) {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.true');
                } else {
                  firePrivateAnalyticsEvent('xflow.request-trial.already-requested.false');
                }
                nextStep();
              }}
              alreadyRequested={alreadyRequested}
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
