/* eslint-disable react/no-multi-comp */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export const crossSellShape = PropTypes.shape({
  state: PropTypes.object,
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
  retrieveJiraUsers: PropTypes.func,
  goToProduct: PropTypes.func,
  closeLoadingDialog: PropTypes.func,
});

export class CrossSellProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    crossSell: crossSellShape,
  };

  state = {
    progress: 0,
  };

  getChildContext() {
    return {
      crossSell: {
        ...this.props,
        state: this.state,
      },
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export const withCrossSellProvider = (WrappedComponent, mapContextToProps = () => {}) =>
  class WithCrossSellProvider extends Component {
    static displayName = `WithCrossSellProvider(${Component.displayName || Component.name})`;
    static contextTypes = {
      crossSell: crossSellShape,
    };
    render() {
      const { props } = this;
      return <WrappedComponent {...mapContextToProps(this.context)} {...props} />;
    }
  };

//
// const Permissions = withFlowProvider(({state: { grantAccessMode }}) => (
//   <div>{grantAccessMode}</div>
// ));
//
// const Hello = () => {
//   return <div>Hello, we are giving access to <Permissions /></div>
// }
//
// class FlowProvider extends Component {
//   childContextTypes = {
//     state: PropTypes.object,
//     onChangeAccessMode: PropTypes.func,
//   }
//   state = {
//     grantAccessMode: 'all',
//   }
//   onChangeAccessMode(newMode) {
//     this.setState({ grantAccessMode: newMode });
//   }
//   render() {
//     return this.children;
//   }
// }
//
// class Flow extends Component {
//   render() {
//     return (
//       <div>
//         <Hello/>
//       </div>
//     )
//   }
// }
//
// const ConfluenceFlow = () => <Flow config={{ productName: 'Confluence' }} />
