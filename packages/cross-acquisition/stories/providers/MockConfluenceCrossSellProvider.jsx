import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { CrossSellProvider } from '@atlaskit/cross-acquisition';

const notImplemented = () => {
  throw new Error('Not implemented.');
};

export default class MockConfluenceCrossSellProvider extends Component {
  render() {
    const defaultProps = {
      config: {
        productLogo: <ConfluenceLogo />,
        requestTrial: {
          accessBanner: 'https://placehold.it/352x214',
          accessHeading: 'Ask your admin for access',
          accessMessage: 'Send a request for your admin to activate confluence',
          notePrompt:
          'Help your site administrator understand why you would like to use Confluence:',
          notePlaceholder: 'I would like to try Confluence because…',
        },
        startTrial: {
          confirmHeader: 'Start your 30 day trial',
          confirmMessage: (
            <p>
              Once your trial finishes, billing will start.<br />
              Easily cancel at anytime in <strong>Manage Application</strong>.<br />
              We will email your billing contact 3 days in advance.
            </p>
          ),
          grantHeader: 'Who should have access?',
          grantDefaultAccess: (
            <p><strong>Everyone in JIRA Software</strong> will have access to Confluence.</p>
          ),
          grantLearnMoreLinkText: 'Learn more',
          grantNotifyUsers: 'Notify these users',
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
          grantAffectBill: 'How will this affect my bill?',
          loadingHeading: "You're almost there...",
          loadingCompleteHeading: 'Confluence is ready my friend!',
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
    };

    const props = {
      ...defaultProps,
      ...this.props,
    };

    return <CrossSellProvider {...props} />;
  }
}
