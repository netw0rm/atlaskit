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

  state = {
  }

  render() {
    return (
      <MultiStep start={0}>
        <Step
          render={nextStep => (
            <RequestTrialAccess
              heading={this.props.productLogo}
              message="Send a request for your admin to activate confluence"
              onRequestAccessClick={nextStep}
              onCancelClick={() => {}}
            />
          )}
        />
        <Step
          render={() => (
            <RequestTrialNote
              prompt="Help your site administrator understand why you would like to use Confluence:"
              placeholder="I would like to try Confluence because…"
            />
          )}
        />
      </MultiStep>
    );
  }
}
