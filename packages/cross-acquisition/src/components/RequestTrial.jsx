import React, { Component } from 'react';

import crossAcquisitionContextTypes from './prop-types/cross-acquisition-context-types';
import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

import { MultiStep, Step } from './multi-step';

export default class RequestTrial extends Component {
  static contextTypes = crossAcquisitionContextTypes;

  render() {
    let productLogo = null;
    let banner = null;
    let heading = null;
    let message = null;
    let prompt = null;
    let placeholder = null;

    if (this.context.crossAcquisition) {
      productLogo = this.context.crossAcquisition.productLogo;

      if (this.context.crossAcquisition.requestTrial) {
        banner = this.context.crossAcquisition.requestTrial.accessBanner;
        heading = this.context.crossAcquisition.requestTrial.accessHeading;
        message = this.context.crossAcquisition.requestTrial.accessMessage;
        prompt = this.context.crossAcquisition.requestTrial.notePrompt;
        placeholder = this.context.crossAcquisition.requestTrial.notePlaceholder;
      }
    }

    return (
      <MultiStep start={0}>
        <Step
          render={nextStep => (
            <RequestTrialAccess
              productLogo={productLogo}
              banner={banner}
              heading={heading}
              message={message}
              onRequestAccessClick={nextStep}
              onCancelClick={() => {}}
            />
          )}
        />
        <Step
          render={() => (
            <RequestTrialNote
              prompt={prompt}
              placeholder={placeholder}
            />
          )}
        />
      </MultiStep>
    );
  }
}
