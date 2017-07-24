/* eslint-disable react/no-multi-comp */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export const xFlowShape = PropTypes.shape({
  config: PropTypes.shape({
    productLogo: PropTypes.element,
    languagePacks: PropTypes.object.isRequired,
    requestTrial: PropTypes.shape({
      accessBanner: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
    startTrial: PropTypes.shape({
      grantOptionItems: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      grantDefaultSelectedRadio: PropTypes.string,
      grantUserSelectPlaceholder: PropTypes.string,
      grantUsersOption: PropTypes.string,
      grantChooseOption: PropTypes.string,
      alreadyStartedHeading: PropTypes.string,
      alreadyStartedMessage: PropTypes.node,
      alreadyStartedGetStartedButtonText: PropTypes.string,
    }),
  }),

  progress: PropTypes.number,
  status: PropTypes.string,

  canCurrentUserAddProduct: PropTypes.func,
  isProductInstalledOrActivating: PropTypes.func,
  canCurrentUserGrantAccessToProducts: PropTypes.func,
  hasProductBeenEvaluated: PropTypes.func,

  requestTrialAccess: PropTypes.func,
  requestTrialAccessWithNote: PropTypes.func,
  requestTrialAccessWithoutNote: PropTypes.func,
  cancelRequestTrialAccess: PropTypes.func,

  startProductTrial: PropTypes.func,
  cancelStartProductTrial: PropTypes.func,
  grantAccessToUsers: PropTypes.func,
  retrieveUsers: PropTypes.func,
  goToProduct: PropTypes.func,
  closeLoadingDialog: PropTypes.func,
});

export class XFlowProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    xFlow: xFlowShape,
  };

  getChildContext() {
    return {
      xFlow: {
        ...this.props,
      },
    };
  }

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
