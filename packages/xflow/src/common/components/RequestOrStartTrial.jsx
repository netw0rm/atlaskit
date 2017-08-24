import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';

import App from './App';
import { withXFlowProvider } from './XFlowProvider';
import InitializingScreen from './InitializingScreen';
import { StartTrial, AlreadyStarted, ErrorFlag } from '../../start-trial/';
import RequestTrial from '../../request-trial/';
import RequestOrStartTrialDialog from '../styled/RequestOrStartTrialDialog';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from '../productProvisioningStates';

const Screens = {
  INITIALIZING: 'INITIALIZING',
  CANNOT_ADD: 'CANNOT_ADD',
  ALREADY_STARTED: 'ALREADY_STARTED',
  REQUEST_TRIAL: 'REQUEST_TRIAL',
  START_TRIAL: 'START_TRIAL',
};

class RequestOrStartTrial extends Component {
  static propTypes = {
    sourceComponent: PropTypes.string.isRequired,
    sourceContext: PropTypes.string.isRequired,
    canCurrentUserAddProduct: PropTypes.func.isRequired,
    getProductActivationState: PropTypes.func.isRequired,
    waitForActivation: PropTypes.func.isRequired,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    onAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
    onTrialActivating: PropTypes.func,
  };

  static defaultProps = {
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
    const {
      getProductActivationState,
      canCurrentUserAddProduct,
      waitForActivation,
      firePrivateAnalyticsEvent,
    } = this.props;
    const activationState = await getProductActivationState();

    let canAdd;
    try {
      canAdd =
        activationState === INACTIVE || activationState === DEACTIVATED
          ? await canCurrentUserAddProduct()
          : false;
    } catch (e) {
      // Do nothing. Leave "canAdd" undefined.
      firePrivateAnalyticsEvent('xflow.request-or-start-trial.trusted-user-check.failed');
    }

    if (activationState === ACTIVE || activationState === ACTIVATING) {
      this.setState({
        screen: Screens.ALREADY_STARTED,
        activationState,
      });
      if (activationState === ACTIVATING) {
        waitForActivation();
      }
    } else if (
      (activationState === INACTIVE || activationState === DEACTIVATED) &&
      canAdd === true
    ) {
      this.setState({
        screen: Screens.START_TRIAL,
        activationState,
      });
    } else if (
      (activationState === INACTIVE || activationState === DEACTIVATED) &&
      canAdd === false
    ) {
      this.setState({
        screen: Screens.REQUEST_TRIAL,
        activationState,
      });
    } else {
      firePrivateAnalyticsEvent('xflow.request-or-start-trial.initializing-check.failed');
      this.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });
    }
  };

  flagActions = [
    {
      content: 'Retry',
      onClick: () => {
        this.setState({
          initializingCheckFailed: false,
          showInitializationError: false,
        });
        return this.resetRequestOrStartTrial();
      },
    },
  ];

  render() {
    const {
      onAnalyticsEvent,
      onComplete,
      onTrialRequested,
      onTrialActivating,
      sourceComponent,
      sourceContext,
    } = this.props;
    const { activationState, initializingCheckFailed, showInitializationError } = this.state;

    return (
      <App
        onAnalyticsEvent={onAnalyticsEvent}
        sourceComponent={sourceComponent}
        sourceContext={sourceContext}
      >
        <RequestOrStartTrialDialog id="xflow-request-or-start-trial-dialog">
          {(() => {
            switch (this.state.screen) {
              case Screens.INITIALIZING: {
                return (
                  <div>
                    <InitializingScreen isOpen={!initializingCheckFailed} />
                    <ErrorFlag
                      flagRetry
                      flagActions={this.flagActions}
                      title="Oops... Something went wrong"
                      description="Let's try again."
                      showFlag={showInitializationError}
                      onDismissed={() => {
                        this.setState({
                          showInitializationError: false,
                        });
                        return onComplete();
                      }}
                    />
                  </div>
                );
              }
              case Screens.START_TRIAL: {
                return (
                  <StartTrial
                    onComplete={onComplete}
                    onTrialActivating={onTrialActivating}
                    showGrantAccess={activationState === INACTIVE}
                  />
                );
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

export const RequestOrStartTrialBase = withAnalytics(RequestOrStartTrial);

export default withXFlowProvider(
  RequestOrStartTrialBase,
  ({ xFlow: { canCurrentUserAddProduct, getProductActivationState, waitForActivation } }) => ({
    canCurrentUserAddProduct,
    getProductActivationState,
    waitForActivation,
  })
);
