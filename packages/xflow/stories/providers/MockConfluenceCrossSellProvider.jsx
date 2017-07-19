import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { CrossSellProvider } from '@atlaskit/xflow';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

import languagePacks from '../../src/jira-confluence/language-packs.json';

export default class MockConfluenceCrossSellProvider extends Component {
  render() {
    const defaultProps = {
      config: {
        productLogo: <ConfluenceLogo />,
        languagePacks,
        requestTrial: {
          accessBanner: 'https://placehold.it/352x214',
          accessHeading: 'Ask your admin for access',
          accessMessage: 'Send a request for your admin to activate confluence',
          notePrompt:
            'Help your site administrator understand why you would like to use Confluence:',
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

      startProductTrial: notImplemented,
      cancelStartProductTrial: notImplemented,
      grantAccessToUsers: notImplemented,
      retrieveUsers: notImplemented,
      goToProduct: notImplemented,
      closeLoadingDialog: notImplemented,
    };

    const props = {
      ...defaultProps,
      ...this.props,
    };

    return <CrossSellProvider {...props} />;
  }
}
