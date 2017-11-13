import React from 'react';
import { JiraServiceDeskLogo } from '@atlaskit/logo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { isUserTrusted } from '../common/tenantContext';
import productXFlowProviderFactory from '../common/productXFlowProviderFactory';
import grantAccessToUsers from '../common/grantAccessToUsers';
import productStatusChecker from '../common/productStatusChecker';
import startProductTrial from '../common/startProductTrial';

import retrieveUserManagementUsers, {
    JIRA_SOFTWARE_GROUP,
    SITE_ADMINS_GROUP,
} from '../common/retrieveUserManagementUsers';

const VALID_GROUPS = [
  JIRA_SOFTWARE_GROUP,
  SITE_ADMINS_GROUP,
];

const messages = defineMessages({
  // Start Trial
  // - Confirm Trial dialog
  confirmTrialHeading: {
    id: 'xflow.j2jsd.start-trial.confirm-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },
  confirmReactivateHeading: {
    id: 'xflow.j2jsd.start-trial.reactivate-trial.heading',
    defaultMessage: 'Welcome back',
  },
  confirmReactivateMessage0: {
    id: 'xflow.j2jsd.start-trial.reactivate-trial.message.p0',
    defaultMessage: 'If your instance is eligible for a trial, Jira Service Desk will be free for 30 days.',
  },
  confirmReactivateMessage1: {
    id: 'xflow.j2jsd.start-trial.reactivate-trial.message.p1',
    defaultMessage: 'Otherwise, billing will start immediately.',
  },
  confirmReactivateMessage2: {
    id: 'xflow.j2jsd.start-trial.reactivate-trial.message.p1',
    defaultMessage:
      "We'll email your billing contact 3 days prior to the due date with any new charges.",
  },

  // - Grant Access dialog
  grantAccessHeading: {
    id: 'xflow.j2jsd.start-trial.grant-access.heading',
    defaultMessage: 'Choose your team',
  },
  grantAccessDefaultAccessFrom: {
    id: 'xflow.j2jsd.start-trial.grant-access.default-access.from',
    defaultMessage: 'All of your Jira Software users',
  },
  grantAccessDefaultAccessTo: {
    id: 'xflow.j2jsd.start-trial.grant-access.default-access.to',
    defaultMessage: 'will be available in Jira Service Desk.',
  },
  grantAccessOptionItemsLabelEveryone: {
    id: 'xflow.j2jsd.start-trial.grant-access.option.everyone',
    defaultMessage: 'All of your Jira Software users',
  },
  grantAccessOptionItemsLabelLater: {
    id: 'xflow.j2jsd.start-trial.grant-access.option.later',
    defaultMessage: 'I\'ll choose my team later',
  },
  grantAccessOptionItemsLabelSpecificUsers: {
    id: 'xflow.j2jsd.start-trial.grant-access.option.specific-users',
    defaultMessage: 'Specific users',
  },
  grantAccessSelectLabel: {
    id: 'xflow.j2jsd.start-trial.grant-access.select-label',
    defaultMessage: 'Who can start solving problems in Jira Service Desk?',
  },
  grantAccessUserSelectPlaceholder: {
    id: 'xflow.j2jsd.start-trial.grant-access.select-placeholder',
    defaultMessage: 'Start typing a username',
  },

  // - Loading Time dialog
  loadingProductGotoProductButton: {
    id: 'xflow.j2jsd.start-trial.loading-product-trial.goto-button',
    defaultMessage: 'Create a project',
  },

  // - Already Started dialog
  alreadyStartedHeading: {
    id: 'xflow.j2jsd.start-trial.already-started.heading',
    defaultMessage: 'You already have Jira Service Desk',
  },
  alreadyStartedMessage0: {
    id: 'xflow.j2jsd.start-trial.already-started.message.p0',
    defaultMessage: 'A site administrator already started a trial.',
  },
  alreadyStartedMessage1: {
    id: 'xflow.j2jsd.start-trial.already-started.message.p1',
    defaultMessage: 'With Jira Service Desk, IT and developer teams can collaborate on one platform to fix incidents faster and push changes with confidence.',
  },
  alreadyStartedGetStartedButtonText: {
    id: 'xflow.j2jsd.start-trial.already-started.get-started-button',
    defaultMessage: 'Get Started',
  },

  // Request Trial
  accessHeading: {
    id: 'xflow.j2jsd.request-trial.access.heading',
    defaultMessage: 'A modern, simple service desk',
  },
  accessMessage: {
    id: 'xflow.j2jsd.request-trial.access.message',
    defaultMessage: 'Get a fully featured service desk with self-service, automation, SLAs, and CSAT reporting.',
  },
  notePrompt: {
    id: 'xflow.j2jsd.request-trial.note.prompt',
    defaultMessage: 'Send a quick note telling your site admin why you’re keen to try Jira Service Desk:',
  },
  notePlaceholder: {
    id: 'xflow.j2jsd.request-trial.note.placeholder',
    defaultMessage: 'I’d like us to give Jira Service Desk a try - it gives dev and IT one platform to work on, and it’s free for 30 days!',
  },
  notePlaceholderShort: {
    id: 'xflow.j2c.request-trial.note.placeholder.short',
    defaultMessage: "Hi! I'd like to try Jira Service Desk.",
  },
});

export const defaultProps = intl => ({
  config: {
    productLogo: <JiraServiceDeskLogo size={'small'} />,
    requestTrial: {
      accessImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/FinFRcy0ueg9Kx12tie9q8HTCk_g8scZcvpcevMWLU4/Jira-Service-Desk.svg',
      accessHeading: intl.formatMessage(messages.accessHeading),
      accessMessage: intl.formatMessage(messages.accessMessage),
      accessLearnMoreLink: 'https://www.atlassian.com/software/jira/service-desk',
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
          id="xflow.j2jsd.start-trial.confirm-trial.message"
          tagName="p"
          defaultMessage="Once your trial finishes, billing will start.{br}Easily cancel at any time in Manage subscriptions.{br}We'll email your billing contact 3 days in advance."
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

      grantAccessHeading: intl.formatMessage(messages.grantAccessHeading),
      grantAccessDefaultAccess: (
        <p>
          <strong>{intl.formatMessage(messages.grantAccessDefaultAccessFrom)} </strong>
          {intl.formatMessage(messages.grantAccessDefaultAccessTo)}
        </p>
      ),
      grantAccessSelectLabel: intl.formatMessage(messages.grantAccessSelectLabel),
      grantAccessUserSelectPlaceholder: intl.formatMessage(
        messages.grantAccessUserSelectPlaceholder
      ),
      grantAccessDefaultSelectedRadio: 'everyone',
      grantAccessUsersOption: 'specific-users',
      grantAccessLaterOption: 'later',
      grantAccessShowNotifyUsersOption: false,
      grantAccessShowAffectMyBill: false,
      grantAccessShowProgressIndicator: false,
      grantAccessOptionItems: [
        {
          value: 'later',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelLater),
        },
        {
          value: 'everyone',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelEveryone),
        },
        {
          value: 'specific-users',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelSpecificUsers),
        },
      ],
      grantAccessLearnMoreLink: 'https://www.atlassian.com/software/jira/service-desk/pricing?tab=cloud',

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

  startProductTrial: startProductTrial('jira-servicedesk.ondemand'),
  cancelStartProductTrial: async () => {},
  productStatusChecker: productStatusChecker('jira-servicedesk.ondemand'),
  grantAccessToUsers: grantAccessToUsers('jira-servicedesk-users', 'Jira Service Desk', 'Grants access to Jira Service Desk'),
  retrieveUsers: retrieveUserManagementUsers(VALID_GROUPS),
  goToProduct: () => {
    window.top.location.href = '/secure/LandingPage.jspa?product=jira-servicedesk';
  },
  closeLoadingDialog: async () => {},
  closeAlreadyStartedDialog: async () => {},
  checkProductRequestFlag: () => (false),
  setProductRequestFlag: () => { /* do nothing */ },
});

export default productXFlowProviderFactory(defaultProps);
