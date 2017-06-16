import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import RequestTrial from './RequestTrial';

export default class ConfluenceRequestTrial extends Component {
  render() {
    return (
      <RequestTrial productLogo={<ConfluenceLogo />} header="Request access to confluence">
        <p>Send a request for your admin to activate confluence</p>
      </RequestTrial>
    );
  }
}
