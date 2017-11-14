import React from 'react';
import { JiraCoreLogo } from '@atlaskit/logo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { isUserTrusted } from '../common/services/tenantContext';
import productXFlowProviderFactory from '../common/productXFlowProviderFactory';
import grantAccessToUsers from '../common/services/grantAccessToUsers';
import productStatusChecker from '../common/services/productStatusChecker';
import startProductTrial from '../common/services/startProductTrial';

import retrieveUserManagementUsers, {
    SITE_ADMINS_GROUP,
} from '../common/services/retrieveUserManagementUsers';

const VALID_GROUPS = [
  SITE_ADMINS_GROUP,
];

const messages = defineMessages({
  // Start Trial
  // - Confirm Trial dialog
  confirmTrialHeading: {
    id: 'xflow.j2jc.start-trial.confirm-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },
  confirmReactivateHeading: {
    id: 'xflow.j2jc.start-trial.reactivate-trial.heading',
    defaultMessage: 'Welcome back',
  },
  confirmReactivateMessage0: {
    id: 'xflow.j2jc.start-trial.reactivate-trial.message.p0',
    defaultMessage: 'If your instance is eligible for a trial, Jira Core will be free for 30 days.',
  },
  confirmReactivateMessage1: {
    id: 'xflow.j2jc.start-trial.reactivate-trial.message.p1',
    defaultMessage: 'Otherwise, billing will start immediately.',
  },
  confirmReactivateMessage2: {
    id: 'xflow.j2jc.start-trial.reactivate-trial.message.p1',
    defaultMessage:
      "We'll email your billing contact 3 days prior to the due date with any new charges.",
  },

  // - Loading Time dialog
  loadingProductGotoProductButton: {
    id: 'xflow.j2jc.start-trial.loading-product-trial.goto-button',
    defaultMessage: 'Create a project',
  },

  // - Already Started dialog
  alreadyStartedHeading: {
    id: 'xflow.j2jc.start-trial.already-started.heading',
    defaultMessage: 'You already have Jira Core',
  },
  alreadyStartedMessage0: {
    id: 'xflow.j2jc.start-trial.already-started.message.p0',
    defaultMessage: 'A site administrator already started a trial.',
  },
  alreadyStartedMessage1: {
    id: 'xflow.j2jc.start-trial.already-started.message.p1',
    defaultMessage: 'Jira Core brings perfect project planning to any team, making it simple to monitor progress and measure performance.',
  },
  alreadyStartedGetStartedButtonText: {
    id: 'xflow.j2jc.start-trial.already-started.get-started-button',
    defaultMessage: 'Get Started',
  },

  // Request Trial
  accessHeading: {
    id: 'xflow.j2jc.request-trial.access.heading',
    defaultMessage: 'Perfect projects for any team',
  },
  accessMessage: {
    id: 'xflow.j2jc.request-trial.access.message',
    defaultMessage: 'Easily manage projects, measure performance, and monitor details.',
  },
  notePrompt: {
    id: 'xflow.j2jc.request-trial.note.prompt',
    defaultMessage: 'Send a quick note telling your site admin why you’re keen to try Jira Core:',
  },
  notePlaceholder: {
    id: 'xflow.j2jc.request-trial.note.placeholder',
    defaultMessage: 'I’d like us to give Jira Core a try - it’s simple, powerful project management for any type of team, and it’s free for 30 days!',
  },
  notePlaceholderShort: {
    id: 'xflow.j2jc.request-trial.note.placeholder.short',
    defaultMessage: "Hi! I'd like to try Jira Core.",
  },
});

export const defaultProps = intl => ({
  config: {
    productLogo: <JiraCoreLogo size={'small'} />,
    requestTrial: {
      accessImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/s9DdLQHaFygnoHCJbcc3S6Ku-kY0hKRnr6GzDOe9uFg/Finishing-Tasks.svg',
      accessHeading: intl.formatMessage(messages.accessHeading),
      accessMessage: intl.formatMessage(messages.accessMessage),
      accessLearnMoreLink: 'https://www.atlassian.com/software/jira/core',
      notePrompt: intl.formatMessage(messages.notePrompt),
      notePlaceholder: intl.formatMessage(messages.notePlaceholder),
      notePlaceholderShort: intl.formatMessage(messages.notePlaceholderShort),
    },
    contextualStartTrial: {
      contextualStartTrialHeader:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/gzztkbTAQf3dfk3_iD9r4hu-ke0srRD9B6qCE4yZbqA/creating-content.svg',
    },
    startTrial: {
      confirmTrialHeading: intl.formatMessage(messages.confirmTrialHeading),
      confirmTrialMessage: (
        <FormattedMessage
          id="xflow.j2jc.start-trial.confirm-trial.message"
          tagName="p"
          defaultMessage="Once your trial finishes, billing will start.{br}Easily cancel at any time in Manage applications.{br}We'll email your billing contact 3 days in advance."
          values={{ br: <br /> }}
        />
      ),

      confirmReactivateHeading: intl.formatMessage(messages.confirmReactivateHeading),
      confirmReactivateMessage: (
        <div>
          <p>
            {intl.formatMessage(messages.confirmReactivateMessage0)}
          </p>
          <p>
            {intl.formatMessage(messages.confirmReactivateMessage1)}
          </p>
          <p>
            {intl.formatMessage(messages.confirmReactivateMessage2)}
          </p>
        </div>
      ),

      loadingProductGotoProductButton: intl.formatMessage(messages.loadingProductGotoProductButton),

      alreadyStartedHeading: intl.formatMessage(messages.alreadyStartedHeading),

      alreadyStartedMessage: (
        <div>
          <p>
            {intl.formatMessage(messages.alreadyStartedMessage0)}
          </p>

          <p>
            {intl.formatMessage(messages.alreadyStartedMessage1)}
          </p>
        </div>
      ),
      alreadyStartedGetStartedButtonText: intl.formatMessage(
        messages.alreadyStartedGetStartedButtonText
      ),
    },
  },
  canCurrentUserAddProduct: isUserTrusted,
  canCurrentUserGrantAccessToProducts: isUserTrusted,

  requestTrialAccess: async () => {},
  requestTrialAccessWithNote: async () => {},
  requestTrialAccessWithoutNote: async () => {},
  cancelRequestTrialAccess: async () => {},

  startProductTrial: startProductTrial('jira-core.ondemand'),
  cancelStartProductTrial: async () => {},
  productStatusChecker: productStatusChecker('jira-core.ondemand'),
  grantAccessToUsers: grantAccessToUsers('jira-core-users', 'Jira Core', 'Grants access to Jira Core'),
  retrieveUsers: retrieveUserManagementUsers(VALID_GROUPS),
  goToProduct: () => {
    window.top.location.href = '/secure/LandingPage.jspa?product=jira-core';
  },
  closeLoadingDialog: async () => {},
  closeAlreadyStartedDialog: async () => {},
  checkProductRequestFlag: () => (false),
  setProductRequestFlag: () => { /* do nothing */ },

  // Grant Access has not been developed for Core. Do not activate in Production.
  grantAccessEnabled: false,
});

export default productXFlowProviderFactory(defaultProps);
