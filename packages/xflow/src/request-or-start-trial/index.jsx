import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';
import XFlowAnalyticsListener from '../common/components/XFlowAnalyticsListener';

import { withXFlowProvider } from '../common/components/XFlowProvider';
import InitializingScreen from '../common/components/InitializingScreen';
import ContextualStartTrial from './components/ContextualStartTrial';
import StartTrial from './components/StartTrial';
import RequestTrial from './components/RequestTrial';
import AlreadyStarted from './components/AlreadyStarted';
import ErrorFlag from '../common/components/ErrorFlag';
import RequestOrStartTrialDialog from './styled/RequestOrStartTrialDialog';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from '../common/productProvisioningStates';

export const Screens = {
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
    targetProduct: PropTypes.string.isRequired,
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string,
      contextualMessage: PropTypes.string,
      reactivateCTA: PropTypes.string,
      trialCTA: PropTypes.string,
    }),
    grantAccessEnabled: PropTypes.bool,

    canCurrentUserAddProduct: PropTypes.func.isRequired,
    getProductActivationState: PropTypes.func.isRequired,
    checkProductRequestFlag: PropTypes.func,
    waitForActivation: PropTypes.func.isRequired,
    onAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
    onTrialActivating: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onComplete: () => {},
    onTrialRequested: () => {},
    onTrialActivating: () => {},
    grantAccessEnabled: true,
  };

  state = {
    screen: Screens.INITIALIZING,
    error: null,
    initializingCheckFailed: false,
    activationState: UNKNOWN,
    alreadyRequested: false,
  };

  componentDidMount() {
    return this.fetchAsyncData();
  }

  onFailure(operationName) {
    this.props.firePrivateAnalyticsEvent(`xflow.request-or-start-trial.${operationName}.failed`);
    this.setState({
      initializingCheckFailed: true,
      showInitializationError: true,
    });
  }

  fetchAsyncData = async () => {
    let hasPermissionToAddProduct;
    try {
      hasPermissionToAddProduct = await this.props.canCurrentUserAddProduct();
    } catch (e) {
      this.onFailure('trusted-user-check');
      throw e;
    }

    return hasPermissionToAddProduct ?
      (await this.fetchAsyncStartFlowData()) :
      (await this.fetchAsyncRequestFlowData());
  }

  fetchAsyncRequestFlowData = async () => {
    let alreadyRequested;
    try {
      alreadyRequested = await this.props.checkProductRequestFlag();
    } catch (e) {
      this.onFailure('product-request-flag-check');
      throw e;
    }

    this.setState({
      alreadyRequested,
      screen: Screens.REQUEST_TRIAL,
      // We assume that the product is inactive if they don't have permission.
      activationState: INACTIVE,
    });
  }

  fetchAsyncStartFlowData = async () => {
    const {
      getProductActivationState,
      waitForActivation,
    } = this.props;

    let activationState;
    try {
      activationState = await getProductActivationState();
    } catch (e) {
      this.onFailure('product-activation-state-check');
      throw e;
    }

    switch (activationState) {
      case ACTIVE:
      case ACTIVATING:
        this.setState({
          screen: Screens.ALREADY_STARTED,
          activationState,
        });

        if (activationState === ACTIVATING) {
          try {
            await waitForActivation();
          } catch (e) {
            this.onFailure('wait-for-activation');
            throw e;
          }
        }
        break;

      case INACTIVE:
      case DEACTIVATED:
        this.setState({
          screen: Screens.START_TRIAL,
          activationState,
        });
        break;

      default:
        this.onFailure('product-activation-state-check');
        throw new Error('unrecognized activation state!');
    }
  }

  flagActions = [
    {
      content: 'Retry',
      onClick: () => {
        this.setState({
          initializingCheckFailed: false,
          showInitializationError: false,
        });
        return this.fetchAsyncData();
      },
    },
  ];

  handleAnalyticsEvent = (name, data) => {
    const { onAnalyticsEvent, sourceComponent, sourceContext, targetProduct } = this.props;
    if (onAnalyticsEvent) {
      onAnalyticsEvent(name, {
        ...data,
        sourceComponent,
        sourceContext,
        targetProduct,
      });
    }
  };

  render() {
    const {
      onComplete,
      onTrialRequested,
      onTrialActivating,
      sourceComponent,
      sourceContext,
      contextInfo,
      grantAccessEnabled,
    } = this.props;
    const {
      activationState,
      alreadyRequested,
      initializingCheckFailed,
      showInitializationError,
    } = this.state;

    return (
      <XFlowAnalyticsListener
        onEvent={this.handleAnalyticsEvent}
      >
        <RequestOrStartTrialDialog
          id="xflow-request-or-start-trial-dialog"
          sourceComponent={sourceComponent}
          sourceContext={sourceContext}
        >
          {(() => {
            switch (this.state.screen) {
              case Screens.INITIALIZING: {
                return (
                  <div>
                    <InitializingScreen isOpen={!initializingCheckFailed} />
                    <ErrorFlag
                      flagActions={this.flagActions}
                      title="Oops... Something went wrong"
                      description="Let's try again."
                      showFlag={showInitializationError}
                      source="request-or-start-trial"
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
                  contextInfo
                    ? (
                      <ContextualStartTrial
                        onComplete={onComplete}
                        onTrialActivating={onTrialActivating}
                        showGrantAccess={activationState === INACTIVE && grantAccessEnabled}
                        contextInfo={contextInfo}
                      />
                    )
                    : (
                      <StartTrial
                        onComplete={onComplete}
                        onTrialActivating={onTrialActivating}
                        showGrantAccess={activationState === INACTIVE && grantAccessEnabled}
                      />
                    )
                );
              }
              case Screens.ALREADY_STARTED: {
                return <AlreadyStarted onComplete={onComplete} />;
              }
              case Screens.REQUEST_TRIAL: {
                return (<RequestTrial
                  alreadyRequested={alreadyRequested}
                  onComplete={onComplete}
                  onTrialRequested={onTrialRequested}
                  contextInfo={contextInfo}
                />);
              }
              default: {
                return <InitializingScreen />;
              }
            }
          })()}
        </RequestOrStartTrialDialog>
      </XFlowAnalyticsListener>
    );
  }
}

export const RequestOrStartTrialBase = RequestOrStartTrial;

export default withXFlowProvider(
  withAnalytics(RequestOrStartTrialBase),
  ({ xFlow: {
      canCurrentUserAddProduct,
      checkProductRequestFlag,
      getProductActivationState,
      waitForActivation,
      grantAccessEnabled,
  } }) => ({
    canCurrentUserAddProduct,
    checkProductRequestFlag,
    getProductActivationState,
    waitForActivation,
    grantAccessEnabled,
  })
);
