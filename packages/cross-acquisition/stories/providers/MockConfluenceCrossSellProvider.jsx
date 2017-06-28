import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { crossSellShape, CrossSellProvider } from '@atlaskit/cross-acquisition';

const notImplemented = () => { throw new Error('Not implemented.'); };

export default class MockConfluenceCrossSellProvider extends Component {
  static propTypes = crossSellShape;

  render() {
    const defaultProps = {
      productLogo: <ConfluenceLogo />,
      requestTrial: {
        accessBanner: 'https://placehold.it/352x214',
        accessHeading: 'Ask your admin for access',
        accessMessage: 'Send a request for your admin to activate confluence',
        notePrompt: 'Help your site administrator understand why you would like to use Confluence:',
        notePlaceholder: 'I would like to try Confluence because…',
      },
      canCurrentUserAddProduct: notImplemented,
      isProductInstalledOrActivating: notImplemented,
      canCurrentUserGrantAccessToProducts: notImplemented,
      hasProductBeenEvaluated: notImplemented,
    };

    const props = {
      ...defaultProps,
      ...this.props,
    };

    return (
      <CrossSellProvider {...props} />
    );
  }
}
