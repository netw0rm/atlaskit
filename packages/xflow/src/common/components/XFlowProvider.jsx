/* eslint-disable react/no-multi-comp */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from '../productProvisioningStates';

export const xFlowShape = PropTypes.shape({
  config: PropTypes.shape({
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessImage: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
      notePlaceholderShort: PropTypes.string,
    }),
    startTrial: PropTypes.shape({
      confirmTrialHeading: PropTypes.string,
      confirmTrialMessage: PropTypes.node,
      confirmReactivateHeading: PropTypes.string,
      confirmReactivateMessage: PropTypes.node,

      grantAccessHeading: PropTypes.string,
      grantAccessDefaultAccess: PropTypes.string,
      grantAccessSelectLabel: PropTypes.string,
      grantAccessUserSelectPlaceholder: PropTypes.string,
      grantAccessDefaultSelectedRadio: PropTypes.string,
      grantAccessUsersOption: PropTypes.sting,
      grantAccessOptionItems: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      grantAccessLearnMoreLink: 'https://www.atlassian.com/software/confluence/pricing?tab=cloud',

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

  canCurrentUserAddProduct: PropTypes.func,
  getProductActivationState: PropTypes.func,
  canCurrentUserGrantAccessToProducts: PropTypes.func,

  requestTrialAccessWithNote: PropTypes.func,
  cancelRequestTrialAccess: PropTypes.func,

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

export class XFlowProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
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
    return {
      xFlow: {
        ...this.props,
        ...this.state,
        getProductActivationState: this.getProductActivationState,
        startProductTrial: this.startProductTrial,
        waitForActivation: this.waitForActivation,
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
    return Children.only(this.props.children);
  }
}

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
