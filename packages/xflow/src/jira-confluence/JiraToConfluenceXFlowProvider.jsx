import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
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

const messages = defineMessages({
  startTrialConfirmButtonText: {
    id: 'xflow.start-trial.confirm-button',
    defaultMessage: 'Confirm',
  },
  startTrialCancelButtonText: {
    id: 'xflow.start-trial.cancel-button',
    defaultMessage: 'Cancel',
  },
  startTrialHeading: {
    id: 'xflow.start-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },
  startTrialErrorFlagTitle: {
    id: 'xflow.start-trial.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  startTrialErrorFlagDescription: {
    id: 'xflow.start-trial.error-flag.description',
    defaultMessage: 'Let\'s try that again.',
  },
});

export const defaultProps = intl => ({
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
      confirmButtonText: intl.formatMessage(messages.startTrialConfirmButtonText),
      confirmCancelButtonText: intl.formatMessage(messages.startTrialCancelButtonText),
      trialHeading: intl.formatMessage(messages.startTrialHeading),
      trialMessage: <FormattedMessage id="xflow.start-trial.message" defaultMessage="Once your trial finishes, billing with start.{br}Easily cancel at any time in Manage application.{br}We'll email your billing contact 3 days in advance." values={{ br: <br /> }} />,
      errorFlagTitle: intl.formatMessage(messages.startTrialErrorFlagTitle),
      errorFlagDescription: intl.formatMessage(messages.startTrialErrorFlagDescription),
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

  startProductTrial: startConfluenceTrial,
  cancelStartProductTrial,
  productStatusChecker: confluenceStatusChecker,
  grantAccessToUsers,
  retrieveUsers: retrieveJiraUsers,
  goToProduct,
  closeLoadingDialog,
});

export class JiraToConfluenceXFlowProviderBase extends Component {
  static propTypes = {
    intl: intlShape,
  }

  render() {
    const { intl } = this.props;
    const props = {
      ...defaultProps(intl),
      ...this.props,
    };

    return <XFlowProvider {...props} />;
  }
}
export default injectIntl(JiraToConfluenceXFlowProviderBase);
