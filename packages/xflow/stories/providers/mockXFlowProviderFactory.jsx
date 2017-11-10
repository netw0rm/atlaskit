import React from 'react';

import mockProductStatusChecker from './mockProductStatusChecker';
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

export default (BaseProvider) => class MockJSDXFlowProvider extends BaseProvider {
  render() {
    const props = {
      ...overrideImplementations,
      startProductTrial: () => new Promise(resolve => setTimeout(resolve, 1000)),
      productStatusChecker: mockProductStatusChecker(INACTIVE),
      ...this.state,
      ...this.props,
    };

    return <BaseProvider {...props} />;
  }
}
