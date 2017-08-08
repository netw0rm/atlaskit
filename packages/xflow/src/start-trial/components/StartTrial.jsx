import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

export class StartTrialBase extends Component {
  static propTypes = {
    showGrantAccess: PropTypes.bool.isRequired,
    onComplete: PropTypes.func,
    onTrialActivating: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
    onTrialActivating: () => {},
  };

  render() {
    const { onComplete, onTrialActivating, showGrantAccess } = this.props;
    return (
      <MultiStep start={0} onComplete={onComplete}>
        <Step
          render={(nextStep, cancel) =>
            <ConfirmTrial
              onComplete={async () => {
                await onTrialActivating();
                nextStep(showGrantAccess ? 1 : 2);
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

export default withXFlowProvider(StartTrialBase, () => ({}));
