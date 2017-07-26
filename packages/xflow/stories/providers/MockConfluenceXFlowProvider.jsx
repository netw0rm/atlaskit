import React from 'react';
import JiraToConfluenceXFlowProvider from '../../src/jira-confluence/JiraToConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './mockConfluenceStatusChecker';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

const overrideImplementations = {
  canCurrentUserAddProduct: notImplemented,
  isProductInstalledOrActivating: notImplemented,
  canCurrentUserGrantAccessToProducts: notImplemented,
  hasProductBeenEvaluated: notImplemented,

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

export default class MockConfluenceXFlowProvider extends JiraToConfluenceXFlowProvider {
  render() {
    const props = {
      ...overrideImplementations,
      startProductTrial: () => new Promise(resolve => setTimeout(resolve, 1000)),
      productStatusChecker: mockConfluenceStatusChecker,
      ...this.state,
      ...this.props,
    };

    return <JiraToConfluenceXFlowProvider {...props} />;
  }
}
