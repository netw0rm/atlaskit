import React, { Component } from 'react';

import { crossSellShape } from '../../common/components/CrossSellProvider';
import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

import { MultiStep, Step } from '../../multi-step';

export default class RequestTrial extends Component {
  static contextTypes = crossSellShape;

  render() {
    let productLogo = null;
    let banner = null;
    let heading = null;
    let message = null;
    let prompt = null;
    let placeholder = null;

    if (this.context.crossSell) {
      productLogo = this.context.crossSell.productLogo;

      if (this.context.crossSell.requestTrial) {
        banner = this.context.crossSell.requestTrial.accessBanner;
        heading = this.context.crossSell.requestTrial.accessHeading;
        message = this.context.crossSell.requestTrial.accessMessage;
        prompt = this.context.crossSell.requestTrial.notePrompt;
        placeholder = this.context.crossSell.requestTrial.notePlaceholder;
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
