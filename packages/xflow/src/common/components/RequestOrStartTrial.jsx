/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import App from './App';
import { withXFlowProvider } from './XFlowProvider';
import InitializingScreen from './InitializingScreen';
import RequestTrial from '../../request-trial/components/RequestTrial';
import StartTrial from '../../start-trial/components/StartTrial';
import AlreadyStarted from '../../start-trial/components/AlreadyStarted';
import ErrorFlag from '../../start-trial/components/ErrorFlag';

import RequestOrStartTrialDialog from '../styled/RequestOrStartTrialDialog';

import { ACTIVE, ACTIVATING, INACTIVE, UNKNOWN } from '../productProvisioningStates';

const Screens = {
  INITIALIZING: 'INITIALIZING',
  CANNOT_ADD: 'CANNOT_ADD',
  ALREADY_STARTED: 'ALREADY_STARTED',
  REQUEST_TRIAL: 'REQUEST_TRIAL',
  START_TRIAL: 'START_TRIAL',
};

class RequestOrStartTrial extends Component {
  static propTypes = {
    locale: PropTypes.string,
    onAnalyticsEvent: PropTypes.func.isRequired,
    canCurrentUserAddProduct: PropTypes.func.isRequired,
    getProductActivationState: PropTypes.func.isRequired,
    waitForActivation: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
    onTrialActivating: PropTypes.func,
  };

  static defaultProps = {
    locale: 'en_US',
    onComplete: () => {},
    onTrialRequested: () => {},
    onTrialActivating: () => {},
  };

  state = {
    screen: Screens.INITIALIZING,
    error: null,
    initializingCheckFailed: false,
    activationState: UNKNOWN,
  };

  async componentWillMount() {
    return this.resetRequestOrStartTrial();
  }

  resetRequestOrStartTrial = async () => {
    const { getProductActivationState, canCurrentUserAddProduct, waitForActivation } = this.props;
    const activationState = await getProductActivationState();

    let canAdd;
    try {
      canAdd = activationState === INACTIVE ? await canCurrentUserAddProduct() : false;
    } catch (e) {
      // canAdd = null;
    }

    if (activationState === ACTIVE || activationState === ACTIVATING) {
      this.setState({
        screen: Screens.ALREADY_STARTED,
      });
      if (activationState === ACTIVATING) {
        waitForActivation();
      }
    } else if (activationState === INACTIVE && canAdd === true) {
      this.setState({
        screen: Screens.START_TRIAL,
        activationState,
      });
    } else if (activationState === INACTIVE && canAdd === false) {
      this.setState({
        screen: Screens.REQUEST_TRIAL,
        activationState,
      });
    } else {
      this.setState({ initializingCheckFailed: true });
    }
  };

  flagActions = [
    {
      content: 'Retry',
      onClick: () => {
        this.setState({ initializingCheckFailed: false });
        return this.resetRequestOrStartTrial();
      },
    },
  ];

  render() {
    const {
      locale,
      onAnalyticsEvent,
      onComplete,
      onTrialRequested,
      onTrialActivating,
    } = this.props;

    return (
      <App locale={locale} onAnalyticsEvent={onAnalyticsEvent}>
        <RequestOrStartTrialDialog id="xflow-request-or-start-trial-dialog">
          {(() => {
            switch (this.state.screen) {
              case Screens.INITIALIZING: {
                return (
                  <div>
                    <InitializingScreen isOpen={!this.state.initializingCheckFailed} />
                    <ErrorFlag
                      flagRetry
                      flagActions={this.flagActions}
                      title="Oops... Something went wrong"
                      description="Let's try again."
                      showFlag={this.state.initializingCheckFailed}
                      onDismissed={() => this.setState({ initializingCheckFailed: false })}
                    />
                  </div>
                );
              }
              case Screens.START_TRIAL: {
                return <StartTrial onComplete={onComplete} onTrialActivating={onTrialActivating} />;
              }
              case Screens.ALREADY_STARTED: {
                return <AlreadyStarted onComplete={onComplete} />;
              }
              case Screens.REQUEST_TRIAL: {
                return <RequestTrial onComplete={onComplete} onTrialRequested={onTrialRequested} />;
              }
              default: {
                return <InitializingScreen />;
              }
            }
          })()}
        </RequestOrStartTrialDialog>
      </App>
    );
  }
}

export default withXFlowProvider(
  RequestOrStartTrial,
  ({ xFlow: { canCurrentUserAddProduct, getProductActivationState, waitForActivation } }) => ({
    canCurrentUserAddProduct,
    getProductActivationState,
    waitForActivation,
  })
);
