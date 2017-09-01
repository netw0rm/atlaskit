import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../common/components/multi-step';

import RequestAccess from './RequestAccess';
import RequestAccessNote from './RequestAccessNote';

export class RequestTrialBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
    onTrialRequested: () => {},
  };

  render() {
    const { onComplete, onTrialRequested } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <RequestAccess
              onComplete={async () => {
                await onTrialRequested();
                nextStep();
              }}
              onCancel={cancel}
            />}
        />
        <Step render={nextStep => <RequestAccessNote onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export default withXFlowProvider(RequestTrialBase);
