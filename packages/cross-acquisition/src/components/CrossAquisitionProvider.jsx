import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';

export default class CrossAquisitionProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    productLogo: PropTypes.element,
    requestTrial: PropTypes.shape({
      accessBanner: PropTypes.string,
      accessHeading: PropTypes.string,
      accessMessage: PropTypes.node,
      notePrompt: PropTypes.node,
      notePlaceholder: PropTypes.string,
    }),
  };

  static childContextTypes = {
    crossAcquisition: PropTypes.shape({
      productLogo: PropTypes.element,
      requestTrial: PropTypes.shape({
        accessBanner: PropTypes.string,
        accessHeading: PropTypes.string,
        accessMessage: PropTypes.node,
        notePrompt: PropTypes.node,
        notePlaceholder: PropTypes.string,
      }),
    }),
  }

  getChildContext() {
    return {
      crossAcquisition: {
        productLogo: this.props.productLogo || <AtlassianLogo />,
        requestTrial: this.props.requestTrial || null,
      },
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
