import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { CrossSellProvider } from '../common/components/CrossSellProvider';

import { isUserTrusted } from './tenantContext';
import isConfluenceInstalledOrActivating from './isConfluenceInstalledOrActivating';
import hasConfluenceBeenEvaluated from './hasConfluenceBeenEvaluated';
import requestTrialAccess from './requestTrialAccess';
import requestTrialAccessWithNote from './requestTrialAccessWithNote';
import requestTrialAccessWithoutNote from './requestTrialAccessWithoutNote';
import cancelRequestTrialAccess from './cancelRequestTrialAccess';
import startProductTrial from './startProductTrial';
import cancelStartProductTrial from './cancelStartProductTrial';
import grantAccessToUsers from './grantAccessToUsers';
import retrieveJiraUsers from './retrieveJiraUsers';
import goToProduct from './goToProduct';
import closeLoadingDialog from './closeLoadingDialog';

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
          confirmButtonText: 'Confirm',
          confirmCancelButtonText: 'Cancel',
          grantHeader: 'Who should have access?',
          grantDefaultAccess: (
            <p>
              <strong>Everyone in JIRA Software</strong> will have <br /> access to Confluence.
            </p>
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
      canCurrentUserAddProduct: isUserTrusted,
      canCurrentUserGrantAccessToProducts: isUserTrusted,
      isProductInstalledOrActivating: isConfluenceInstalledOrActivating,
      hasProductBeenEvaluated: hasConfluenceBeenEvaluated,

      requestTrialAccess,
      requestTrialAccessWithNote,
      requestTrialAccessWithoutNote,
      cancelRequestTrialAccess,

      startProductTrial,
      cancelStartProductTrial,
      grantAccessToUsers,
      retrieveJiraUsers,
      goToProduct,
      closeLoadingDialog,
    };

    const props = {
      ...defaultProps,
      ...this.props,
    };

    return <CrossSellProvider {...props} />;
  }
}
