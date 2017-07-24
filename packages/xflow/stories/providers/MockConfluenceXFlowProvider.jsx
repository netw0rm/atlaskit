import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { XFlowProvider } from '@atlaskit/xflow';

import mockConfluenceStatusChecker, { ACTIVE } from './mockConfluenceStatusChecker';

const FIVE_MINUTES = 300000; // milliseconds

const notImplemented = () => {
  throw new Error('Not implemented.');
};

import languagePacks from '../../src/jira-confluence/language-packs.json';

const defaultProps = {
  config: {
    productLogo: <ConfluenceLogo />,
    languagePacks,
    requestTrial: {
      accessBanner: 'https://placehold.it/352x214',
      accessHeading: 'Ask your admin for access',
      accessMessage: 'Send a request for your admin to activate confluence',
      notePrompt: 'Help your site administrator understand why you would like to use Confluence:',
      notePlaceholder: 'I would like to try Confluence because…',
    },
    startTrial: {
      grantOptionItems: [
        {
          value: 'everyone',
          label: 'Everyone in JIRA Software',
        },
        {
          value: 'siteAdmins',
          label: 'Site admins only',
        },
        {
          value: 'specificUsers',
          label: 'Specific users',
        },
      ],
      grantDefaultSelectedRadio: 'everyone',
      grantUserSelectPlaceholder: 'Start typing a username',
      grantUsersOption: 'specificUsers',
      grantChooseOption: 'Choose an option',
      alreadyStartedHeading: 'You already have Confluence',
      alreadyStartedMessage: (
        <div>
          <p>A site administrator already started a trial.</p>
          <p>You’re all set to create vital project documentation with your team.</p>
        </div>
      ),
      alreadyStartedGetStartedButtonText: 'Get started',
    },
  },
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

export default class MockConfluenceXFlowProvider extends Component {
  state = {
    progress: 0,
    status: 'UNKNOWN',
  };

  componentWillUnmount() {
    mockConfluenceStatusChecker.stop();
  }

  progressUpdate = ({ status, time }) => {
    const progress = status === ACTIVE ? 1 : Math.min(time / FIVE_MINUTES, 1);
    this.setState({
      progress,
      status,
    });
    if (progress === 1) {
      mockConfluenceStatusChecker.stop();
    }
  };

  startProductTrial = async () => {
    mockConfluenceStatusChecker.start(this.progressUpdate);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  render() {
    const props = {
      ...defaultProps,
      startProductTrial: this.startProductTrial,
      ...this.state,
      ...this.props,
    };

    return <XFlowProvider {...props} />;
  }
}
