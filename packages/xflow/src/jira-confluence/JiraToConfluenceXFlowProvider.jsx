import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { XFlowProvider } from '../common/components/XFlowProvider';

import { isUserTrusted } from './tenantContext';
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
import goToLearnMore from './goToLearnMore';
import closeLoadingDialog from './closeLoadingDialog';
import closeAlreadyStartedDialog from './closeAlreadyStartedDialog';
import languagePacks from './language-packs.json';
import confluenceStatusChecker from './confluenceStatusChecker';

const messages = defineMessages({
  startTrialHeading: {
    id: 'xflow.j2c.start-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },
  grantAccessHeading: {
    id: 'xflow.j2c.grant-access.heading',
    defaultMessage: 'Who should have access?',
  },
  grantAccessDefaultAccess: {
    id: 'xflow.j2c.grant-access.default-access',
    defaultMessage: 'Everyone in JIRA Software will have access to Confluence.',
  },
  loadingProductHeading: {
    id: 'xflow.j2c.loading-product-trial.heading',
    defaultMessage: 'Where to find Confluence',
  },
  loadingProductMessage: {
    id: 'xflow.j2c.loading-product-trial.message',
    defaultMessage: 'Hit the menu icon near your profile image to switch between products.',
  },
  loadingProductGotoProductButton: {
    id: 'xflow.j2c.loading-product-trial.goto-button',
    defaultMessage: 'Go to Confluence',
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
      trialHeading: intl.formatMessage(messages.startTrialHeading),
      trialMessage: (
        <FormattedMessage
          id="xflow.start-trial.message"
          defaultMessage="Once your trial finishes, billing will start.{br}Easily cancel at any time in Manage applications.{br}We'll email your billing contact 3 days in advance."
          values={{ br: <br /> }}
        />
      ),
      grantAccessHeading: intl.formatMessage(messages.grantAccessHeading),
      grantAccessDefaultAccess: intl.formatMessage(messages.grantAccessDefaultAccess),
      loadingProductHeading: intl.formatMessage(messages.loadingProductHeading),
      loadingProductMessage: intl.formatMessage(messages.loadingProductMessage),
      loadingProductGotoProductButton: intl.formatMessage(messages.loadingProductGotoProductButton),
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
      loadingSVGImg: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg',
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
  goToLearnMore,
  closeLoadingDialog,
  closeAlreadyStartedDialog,
});

export class JiraToConfluenceXFlowProviderBase extends Component {
  static propTypes = {
    intl: intlShape,
  };

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
