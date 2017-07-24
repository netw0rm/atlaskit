import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { XFlowProvider } from '../common/components/XFlowProvider';

import { isUserTrusted } from './tenantContext';
import isConfluenceInstalledOrActivating from './isConfluenceInstalledOrActivating';
import hasConfluenceBeenEvaluated from './hasConfluenceBeenEvaluated';
import requestTrialAccess from './requestTrialAccess';
import requestTrialAccessWithNote from './requestTrialAccessWithNote';
import requestTrialAccessWithoutNote from './requestTrialAccessWithoutNote';
import cancelRequestTrialAccess from './cancelRequestTrialAccess';
import startConfluenceTrial from './startConfluenceTrial';
import cancelStartProductTrial from './cancelStartProductTrial';
import grantAccessToUsers from './grantAccessToUsers';
import retrieveJiraUsers from './retrieveJiraUsers';
import goToProduct from './goToProduct';
import closeLoadingDialog from './closeLoadingDialog';
import languagePacks from './language-packs.json';
import confluenceStatusChecker from './confluenceStatusChecker';

const FIVE_MINUTES = 300000; // milliseconds

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
      confirmButtonText: 'Confirm',
      confirmCancelButtonText: 'Cancel',
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
  canCurrentUserAddProduct: isUserTrusted,
  canCurrentUserGrantAccessToProducts: isUserTrusted,
  isProductInstalledOrActivating: isConfluenceInstalledOrActivating,
  hasProductBeenEvaluated: hasConfluenceBeenEvaluated,

  requestTrialAccess,
  requestTrialAccessWithNote,
  requestTrialAccessWithoutNote,
  cancelRequestTrialAccess,

  cancelStartProductTrial,
  grantAccessToUsers,
  retrieveUsers: retrieveJiraUsers,
  goToProduct,
  closeLoadingDialog,
};

export default class JiraToConfluenceXFlowProvider extends Component {
  state = {
    progress: 0,
    status: '',
  };

  componentWillUnmount() {
    confluenceStatusChecker.stop();
  }

  progressUpdate = ({ status, time }) => {
    const progress = status === 'complete' ? 1 : Math.min(time / FIVE_MINUTES, 1);
    this.setState({
      progress,
      status,
    });
    if (progress === 1) {
      confluenceStatusChecker.stop();
    }
  };

  startProductTrial = async (...args) => {
    await startConfluenceTrial(...args);
    confluenceStatusChecker.start(this.progressUpdate);
  };

  render = () => {
    const props = {
      ...defaultProps,
      startProductTrial: this.startProductTrial,
      ...this.state,
      ...this.props,
    };
    return <XFlowProvider {...props} />;
  };
}
