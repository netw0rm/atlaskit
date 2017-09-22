import React from 'react';
import JiraToJSDXFlowProvider from '../../src/jira-jsd/JiraToJSDXFlowProvider';

import mockJSDStatusChecker from './mockJSDStatusChecker';
import { INACTIVE } from '../../src/common/productProvisioningStates';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

const overrideImplementations = {
  canCurrentUserAddProduct: notImplemented,
  isProductInstalledOrActivating: notImplemented,
  canCurrentUserGrantAccessToProducts: notImplemented,

  requestTrialAccess: notImplemented,
  requestTrialAccessWithNote: notImplemented,
  requestTrialAccessWithoutNote: notImplemented,
  cancelRequestTrialAccess: notImplemented,

  cancelStartProductTrial: notImplemented,
  grantAccessToUsers: notImplemented,
  retrieveUsers: notImplemented,
  goToProduct: notImplemented,
  closeLoadingDialog: notImplemented,
};

export default class MockJSDXFlowProvider extends JiraToJSDXFlowProvider {
  render() {
    const props = {
      ...overrideImplementations,
      startProductTrial: () => new Promise(resolve => setTimeout(resolve, 1000)),
      productStatusChecker: mockJSDStatusChecker(INACTIVE),
      ...this.state,
      ...this.props,
    };

    return <JiraToJSDXFlowProvider {...props} />;
  }
}
