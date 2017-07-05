/* eslint-disable react/no-multi-comp */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export const crossSellShape = PropTypes.shape({
  state: PropTypes.object,
  config: PropTypes.shape({
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessBanner: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
    startTrial: PropTypes.shape({
      confirmHeader: PropTypes.string,
      confirmMessage: PropTypes.node,
      grantHeading: PropTypes.string,
      grantDefaultAccess: PropTypes.node,
      grantLearnMoreLinkText: PropTypes.string,
      grantNotifyUsers: PropTypes.string,
      grantOptionItems: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      grantUserSelectPlaceholder: PropTypes.string,
      grantUsersOption: PropTypes.string,
      grantChooseOption: PropTypes.string,
      grantAffectBill: PropTypes.string,
    }),
  }),

  canCurrentUserAddProduct: PropTypes.func,
  isProductInstalledOrActivating: PropTypes.func,
  canCurrentUserGrantAccessToProducts: PropTypes.func,
  hasProductBeenEvaluated: PropTypes.func,
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

export const withCrossSellProvider = (WrappedComponent, mapContextToProps) =>
  class WithCrossSellProvider extends Component {
    static displayName = `WithCrossSellProvider(${Component.displayName || Component.name})`;
    static contextTypes = {
      crossSell: crossSellShape,
    };
    render() {
      const { props } = this;
      const { crossSell } = this.context;
      return (
        <WrappedComponent {...props} crossSell={crossSell} {...mapContextToProps(this.context)} />
      );
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
