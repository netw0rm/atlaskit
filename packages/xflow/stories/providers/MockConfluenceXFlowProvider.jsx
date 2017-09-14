import React from 'react';
import JiraToConfluenceXFlowProvider from '../../src/jira-confluence/JiraToConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './mockConfluenceStatusChecker';
import { INACTIVE } from '../../src/common/productProvisioningStates';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

const overrideImplementations = {
  canCurrentUserAddProduct: notImplemented,
  isProductInstalledOrActivating: notImplemented,
  canCurrentUserGrantAccessToProducts: notImplemented,

  requestTrialAccessWithNote: notImplemented,
  cancelRequestTrialAccess: notImplemented,

  cancelStartProductTrial: notImplemented,
  grantAccessToUsers: notImplemented,
  retrieveUsers: notImplemented,
  goToProduct: notImplemented,
  closeLoadingDialog: notImplemented,
};

export default class MockConfluenceXFlowProvider extends JiraToConfluenceXFlowProvider {
  render() {
    const props = {
      ...overrideImplementations,
      startProductTrial: () => new Promise(resolve => setTimeout(resolve, 1000)),
      productStatusChecker: mockConfluenceStatusChecker(INACTIVE),
      ...this.state,
      ...this.props,
    };

    return <JiraToConfluenceXFlowProvider {...props} />;
  }
}
