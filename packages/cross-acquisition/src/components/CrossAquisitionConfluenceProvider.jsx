import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import CrossAquisitionProvider from './CrossAquisitionProvider';

export default class CrossAquisitionConfluenceProvider extends Component {
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
    };

    const props = {
      ...defaultProps,
      ...this.props,
    };

    return (
      <CrossAquisitionProvider {...props} />
    );
  }
}
