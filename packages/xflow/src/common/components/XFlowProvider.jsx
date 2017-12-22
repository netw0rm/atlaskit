/* eslint-disable react/no-multi-comp */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from '../productProvisioningStates';
import optOutRequestTrialFeature from '../services/optOutRequestTrialFeature';
import cancelOptOut from '../services/cancelOptOut';
import optOutMessagesDefaultProps from '../messages/OptOutMessages';

export const xFlowShape = PropTypes.shape({
  productKey: PropTypes.string.isRequired,

  config: PropTypes.shape({
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessImage: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
    contextualStartTrial: PropTypes.shape({
      contextualStartTrialHeader: PropTypes.string,
    }),
    startTrial: PropTypes.shape({
      confirmTrialHeading: PropTypes.string,
      confirmTrialMessage: PropTypes.node,
      confirmReactivateHeading: PropTypes.string,
      confirmReactivateMessage: PropTypes.node,

      grantAccessHeading: PropTypes.string,
      grantAccessDefaultAccess: PropTypes.node,
      grantAccessSelectLabel: PropTypes.string,
      grantAccessUserSelectPlaceholder: PropTypes.string,
      grantAccessDefaultSelectedRadio: PropTypes.string,
      grantAccessUsersOption: PropTypes.string,
      grantAccessOptionItems: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      grantAccessLearnMoreLink: PropTypes.string,

      loadingProductHeading: PropTypes.string,
      loadingProductMessage: PropTypes.string,
      loadingProductGotoProductButton: PropTypes.string,
      loadingProductHeaderImage: PropTypes.string,

      alreadyStartedHeading: PropTypes.string,
      alreadyStartedMessage: PropTypes.node,
      alreadyStartedGetStartedButtonText: PropTypes.string,
    }),
  }),

  progress: PropTypes.number,
  status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]),

  grantAccessEnabled: PropTypes.bool,

  canCurrentUserAddProduct: PropTypes.func,
  getProductActivationState: PropTypes.func,
  canCurrentUserGrantAccessToProducts: PropTypes.func,

  requestTrialWithNote: PropTypes.func,
  cancelRequestTrial: PropTypes.func,

  startProductTrial: PropTypes.func,
  waitForActivation: PropTypes.func,
  cancelStartProductTrial: PropTypes.func,
  grantAccessToUsers: PropTypes.func,
  retrieveUsers: PropTypes.func,
  goToProduct: PropTypes.func,
  closeLoadingDialog: PropTypes.func,
  closeAlreadyStartedDialog: PropTypes.func,
  checkProductRequestFlag: PropTypes.func,
  setProductRequestFlag: PropTypes.func,
});

class XFlowProviderBase extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    intl: intlShape,
    productStatusChecker: PropTypes.shape({
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired,
    }).isRequired,
    startProductTrial: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    xFlow: xFlowShape,
  };

  state = {
    progress: 0,
    status: INACTIVE,
  };

  getChildContext() {
    const { intl } = this.props;
    const optOutProps = optOutMessagesDefaultProps(intl);

    return {
      xFlow: {
        ...optOutProps,
        ...this.props,
        ...this.state,
        getProductActivationState: this.getProductActivationState,
        startProductTrial: this.startProductTrial,
        waitForActivation: this.waitForActivation,
        optOutRequestTrialFeature,
        cancelOptOut,
      },
    };
  }

  componentWillUnmount() {
    const { productStatusChecker } = this.props;
    productStatusChecker.stop();
  }

  getProductActivationState = async () => {
    const { productStatusChecker } = this.props;
    const status = await productStatusChecker.check();
    this.setState({
      status,
    });
    return status;
  };

  progressUpdate = ({ status, progress }) => {
    this.setState({
      progress,
      status,
    });
  };

  startProductTrial = async (...args) => {
    const { startProductTrial } = this.props;
    await startProductTrial(...args);
    this.waitForActivation();
  };

  waitForActivation = async () => {
    const { productStatusChecker } = this.props;
    productStatusChecker.start(this.progressUpdate);
  };

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

export const XFlowProvider = injectIntl(XFlowProviderBase);

export const withXFlowProvider = (WrappedComponent, mapContextToProps = () => {}) =>
  class WithXFlowProvider extends Component {
    static displayName = `WithXFlowProvider(${Component.displayName || Component.name})`;
    static contextTypes = {
      xFlow: xFlowShape,
    };
    render() {
      const { props } = this;
      return <WrappedComponent {...mapContextToProps(this.context)} {...props} />;
    }
  };
