import React from 'react';
import JiraToConfluenceXFlowProvider from '../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './mockConfluenceStatusChecker';
import { INACTIVE } from '../../src/common/productProvisioningStates';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

const overrideImplementations = {
  canCurrentUserAddProduct: notImplemented,
  isProductInstalledOrActivating: notImplemented,
  canCurrentUserGrantAccessToProducts: notImplemented,

  requestTrialWithNote: notImplemented,
  cancelRequestTrial: notImplemented,

  waitForActivation: notImplemented,
  cancelStartProductTrial: notImplemented,
  grantAccessToUsers: notImplemented,
  retrieveUsers: notImplemented,
  goToProduct: notImplemented,
  closeLoadingDialog: notImplemented,
  checkProductRequestFlag: notImplemented,
  closeAlreadyStartedDialog: notImplemented,

  optOutRequestTrialFeature: notImplemented,
  cancelOptOut: notImplemented,
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
