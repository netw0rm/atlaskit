import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConfluenceLogo } from '@atlaskit/logo';
import CrossAquisitionProvider from './CrossAquisitionProvider';

export default class CrossAquisitionConfluenceProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <CrossAquisitionProvider
        context={{
          productLogo: <ConfluenceLogo />,
        }}
      >{this.props.children}</CrossAquisitionProvider>
    );
  }
}
