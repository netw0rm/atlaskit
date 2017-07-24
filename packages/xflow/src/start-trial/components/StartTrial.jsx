import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

export class StartTrialBase extends Component {
  static propTypes = {
    hasProductBeenEvaluated: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
  };

  render() {
    const { hasProductBeenEvaluated, onComplete } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
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
        <Step render={nextStep => <GrantAccess onComplete={nextStep} />} />
        <Step render={nextStep => <LoadingTime onComplete={nextStep} />} />
      </MultiStep>
    );
  }
}

export default withXFlowProvider(StartTrialBase, ({ xFlow: { hasProductBeenEvaluated } }) => ({
  hasProductBeenEvaluated,
}));
