import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../multi-step';

import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

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
            <RequestTrialAccess
              onComplete={async () => {
                await onTrialRequested();
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

export default withXFlowProvider(RequestTrialBase);
