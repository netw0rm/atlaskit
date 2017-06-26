import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';

import RequestTrialAccess from './RequestTrialAccess';
import RequestTrialNote from './RequestTrialNote';

import { MultiStep, Step } from './multi-step';

export default class RequestTrial extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    // header: PropTypes.string.isRequired,
    // children: PropTypes.node,
    // onRequestAccessClick: PropTypes.func,
    // onCancelClick: PropTypes.func,
    // onSendRequestClick: PropTypes.func,
    // onSendWithoutNoteClick: PropTypes.func,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    onRequestAccessClick: () => {},
    onSendRequestClick: () => {},
    onSendWithoutNoteClick: () => {},
    onCancelClick: () => {},
  }

  static contextTypes = {
    crossAcquisition: PropTypes.object,
  }

  state = {
  }

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
