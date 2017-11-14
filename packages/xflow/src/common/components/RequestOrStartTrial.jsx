import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';
import XFlowAnalyticsListener from '../components/XFlowAnalyticsListener';

import { withXFlowProvider } from './XFlowProvider';
import InitializingScreen from './InitializingScreen';
import { ContextualStartTrial, StartTrial, RequestTrial, AlreadyStarted } from '../../request-or-start-trial/';
import ErrorFlag from '../../common/components/ErrorFlag';
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
    targetProduct: PropTypes.string.isRequired,
    canCurrentUserAddProduct: PropTypes.func.isRequired,
    getProductActivationState: PropTypes.func.isRequired,
    waitForActivation: PropTypes.func.isRequired,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    onAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
    onTrialActivating: PropTypes.func,
    // ESLint doesn't detect prop types only used in async functions
    // eslint-disable-next-line react/no-unused-prop-types
    checkProductRequestFlag: PropTypes.func,
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string,
      contextualMessage: PropTypes.string,
      reactivateCTA: PropTypes.string,
      trialCTA: PropTypes.string,
    }),
    grantAccessEnabled: PropTypes.bool,
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

  async componentWillMount() {
    const { checkProductRequestFlag } = this.props;
    const alreadyRequested = await checkProductRequestFlag();
    this.setState({
      alreadyRequested,
    });
    return this.resetRequestOrStartTrial();
  }

  resetRequestOrStartTrial = async () => {
    const {
      getProductActivationState,
      canCurrentUserAddProduct,
      waitForActivation,
      firePrivateAnalyticsEvent,
    } = this.props;

    let hasPermissionToAddProduct;
    try {
      hasPermissionToAddProduct = await canCurrentUserAddProduct();
    } catch (e) {
      firePrivateAnalyticsEvent('xflow.request-or-start-trial.trusted-user-check.failed');
      this.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });
      return;
    }

    if (!hasPermissionToAddProduct) {
      this.setState({
        screen: Screens.REQUEST_TRIAL,
        // We assume that the product is inactive if they don't have permission.
        activationState: INACTIVE,
      });
    } else {
      const activationState = await getProductActivationState();
      if (activationState === ACTIVE || activationState === ACTIVATING) {
        this.setState({
          screen: Screens.ALREADY_STARTED,
          activationState,
        });
        if (activationState === ACTIVATING) {
          waitForActivation();
        }
      } else if (activationState === INACTIVE || activationState === DEACTIVATED) {
        this.setState({
          screen: Screens.START_TRIAL,
          activationState,
        });
      } else {
        firePrivateAnalyticsEvent('xflow.request-or-start-trial.initializing-check.failed');
        this.setState({
          initializingCheckFailed: true,
          showInitializationError: true,
        });
      }
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

export const RequestOrStartTrialBase = withAnalytics(RequestOrStartTrial);

export default withXFlowProvider(
  RequestOrStartTrialBase,
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
