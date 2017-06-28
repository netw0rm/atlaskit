import React, { Component } from 'react';

import { crossSellShape } from '../../';

import { MultiStep, Step } from '../../multi-step';

import ConfirmTrial from './ConfirmTrial';
import GrantAccess from './GrantAccess';
import LoadingTime from './LoadingTime';

export default class StartTrial extends Component {
  static contextTypes = crossSellShape;

  whenComponentDidMount() {
    this.context.getProgress(() => {
      // TODO: Update the state here.
    });
  }

  render() {
    return (
      <MultiStep start={0}>
        <Step
          render={nextStep => (
            <ConfirmTrial
              onComplete={nextStep}
            />
              )}
        />
        <Step
          render={nextStep => (
            <GrantAccess
              onComplete={nextStep}
            />
              )}
        />
        <Step
          render={nextStep => (
            <LoadingTime
              onComplete={nextStep}
            />
          )}
        />
      </MultiStep>
    );
  }
}
