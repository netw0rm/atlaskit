import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export const crossSellShape = {
  crossSell: PropTypes.shape({
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessBanner: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
    canCurrentUserAddProduct: PropTypes.func,
    isProductInstalledOrActivating: PropTypes.func,
    canCurrentUserGrantAccessToProducts: PropTypes.func,
    hasProductBeenEvaluated: PropTypes.func,
  }),
};

export default class CrossSellProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    ...crossSellShape,
  };

  static childContextTypes = crossSellShape;

  getChildContext() {
    return {
      crossSell: {
        ...this.props,
      },
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
