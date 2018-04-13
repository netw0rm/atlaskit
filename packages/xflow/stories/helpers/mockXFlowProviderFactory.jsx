import React from 'react';
import { action } from '@kadira/storybook';

import mockProductStatusChecker from './mockProductStatusChecker';
import { INACTIVE } from '../../src/common/productProvisioningStates';

const notImplemented = actionName => () => {
  action(`${actionName}`)();
  throw new Error(`Not implemented: callback ${actionName}`);
};

const overrideImplementations = {
  canCurrentUserAddProduct: notImplemented('canCurrentUserAddProduct'),
  canCurrentUserGrantAccessToProducts: notImplemented('canCurrentUserGrantAccessToProducts'),

  startProductTrial: () => {
    action('startProductTrial')();
    return new Promise(resolve => setTimeout(resolve, 1000));
  },
  requestTrialWithNote: action('requestTrialWithNote'),
  cancelRequestTrial: action('cancelRequestTrial'),

  waitForActivation: notImplemented('waitForActivation'),
  cancelStartProductTrial: action('cancelStartProductTrial'),
  grantAccessToUsers: notImplemented('grantAccessToUsers'),
  retrieveUsers: notImplemented('retrieveUsers'),
  retrieveAdminIds: notImplemented('retrieveAdminIds'),
  goToProduct: action('goToProduct'),
  closeLoadingDialog: notImplemented('closeLoadingDialog'),
  checkProductRequestFlag: notImplemented('checkProductRequestFlag'),
  closeAlreadyStartedDialog: notImplemented('closeAlreadyStartedDialog'),

  optOutFeature: notImplemented('optOutFeature'),
  cancelOptOut: action('cancelOptOut'),
};

export default (BaseProvider) => class MockJSDXFlowProvider extends BaseProvider {
  render() {
    const props = {
      ...overrideImplementations,
      productStatusChecker: mockProductStatusChecker(INACTIVE),
      ...this.state,
      ...this.props,
    };

    return <BaseProvider {...props} />;
  }
};
