import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import { defineMessages, FormattedMessage } from 'react-intl';

import { isCurrentUserSiteAdmin } from '../common/services/tenantContext';
import productXFlowProviderFactory from '../common/productXFlowProviderFactory';
import { setAlreadyRequestedFlag, getAlreadyRequestedFlag } from '../common/services/alreadyRequestedFlag';
import productRequest from '../common/services/productRequest';
import startProductTrial from '../common/services/startProductTrial';
import productStatusChecker from '../common/services/productStatusChecker';
import grantAccessToUsers from '../common/services/grantAccessToUsers';
import retrieveUserManagementUsers, {
    JIRA_SOFTWARE_GROUP,
    JIRA_CORE_GROUP,
    JIRA_SERVICE_DESK_GROUP,
    SITE_ADMINS_GROUP,
} from '../common/services/retrieveUserManagementUsers';

const VALID_GROUPS = [
  JIRA_SOFTWARE_GROUP,
  JIRA_CORE_GROUP,
  JIRA_SERVICE_DESK_GROUP,
  SITE_ADMINS_GROUP,
];

const PRODUCT_KEY = 'confluence.ondemand';

const messages = defineMessages({
  // Start Trial
  // - Confirm Trial dialog
  confirmTrialHeading: {
    id: 'xflow.j2c.start-trial.confirm-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },
  confirmReactivateHeading: {
    id: 'xflow.j2c.start-trial.reactivate-trial.heading',
    defaultMessage: 'Welcome back',
  },
  confirmReactivateMessage0: {
    id: 'xflow.j2c.start-trial.reactivate-trial.message.p0',
    defaultMessage:
      'If your instance is eligible for a trial, Confluence will be free for 30 days.',
  },
  confirmReactivateMessage1: {
    id: 'xflow.j2c.start-trial.reactivate-trial.message.p1',
    defaultMessage: 'Otherwise, billing will start immediately.',
  },
  confirmReactivateMessage2: {
    id: 'xflow.j2c.start-trial.reactivate-trial.message.p1',
    defaultMessage:
      "We'll email your billing contact 3 days prior to the due date with any new charges.",
  },

  // - Grant Access dialog
  grantAccessHeading: {
    id: 'xflow.j2c.start-trial.grant-access.heading',
    defaultMessage: 'Who should have access?',
  },
  grantAccessDefaultAccess: {
    id: 'xflow.j2c.start-trial.grant-access.default-access',
    defaultMessage: 'Everyone in Jira will have access to Confluence.',
  },
  grantAccessOptionItemsLabelEveryone: {
    id: 'xflow.j2c.start-trial.grant-access.option.everyone',
    defaultMessage: 'Everyone in Jira',
  },
  grantAccessOptionItemsLabelSiteAdmins: {
    id: 'xflow.j2c.start-trial.grant-access.option.site-admins',
    defaultMessage: 'Site admins only',
  },
  grantAccessOptionItemsLabelSpecificUsers: {
    id: 'xflow.j2c.start-trial.grant-access.option.specific-users',
    defaultMessage: 'Specific users',
  },
  // grantAccessSelectLabel: {
  //   id: 'xflow.j2c.start-trial.grant-access.select-label',
  //   defaultMessage: ' ',
  // },
  grantAccessUserSelectPlaceholder: {
    id: 'xflow.j2c.start-trial.grant-access.select-placeholder',
    defaultMessage: 'Start typing a username',
  },

  // - Loading Time dialog
  loadingProductHeading: {
    id: 'xflow.j2c.start-trial.loading-product-trial.heading',
    defaultMessage: 'Where to find Confluence',
  },
  loadingProductMessage: {
    id: 'xflow.j2c.start-trial.loading-product-trial.message',
    defaultMessage: 'Hit the menu icon near your profile image to switch between products.',
  },
  loadingProductGotoProductButton: {
    id: 'xflow.j2c.start-trial.loading-product-trial.goto-button',
    defaultMessage: 'Go to Confluence',
  },

  // - Already Started dialog
  alreadyStartedHeading: {
    id: 'xflow.j2c.start-trial.already-started.heading',
    defaultMessage: 'You already have Confluence',
  },
  alreadyStartedMessage0: {
    id: 'xflow.j2c.start-trial.already-started.message.p0',
    defaultMessage: 'A site administrator already started a trial.',
  },
  alreadyStartedMessage1: {
    id: 'xflow.j2c.start-trial.already-started.message.p1',
    defaultMessage: 'You’re all set to create vital project documentation with your team.',
  },
  alreadyStartedGetStartedButtonText: {
    id: 'xflow.j2c.start-trial.already-started.get-started-button',
    defaultMessage: 'Get Started',
  },

  // Request Trial
  accessHeading: {
    id: 'xflow.j2c.request-trial.access.heading',
    defaultMessage: "Jira's perfect partner",
  },
  accessMessage: {
    id: 'xflow.j2c.request-trial.access.message',
    defaultMessage: 'Confluence helps your team create and collaborate on project documentation and it integrates perfectly with Jira.',
  },
  notePrompt: {
    id: 'xflow.j2c.request-trial.note.prompt',
    defaultMessage: "Send a quick note telling your site admin why you're keen to try Confluence:",
  },
  notePlaceholder: {
    id: 'xflow.j2c.request-trial.note.placeholder',
    defaultMessage:
      "Hi! I'd like to try Confluence. It helps give the team more context on anything happening in Jira - and there's a free 30 day trial.",
  },
  notePlaceholderShort: {
    id: 'xflow.j2c.request-trial.note.placeholder.short',
    defaultMessage: "Hi! I'd like to try Confluence.",
  },
});

export const defaultProps = intl => ({
  productKey: PRODUCT_KEY,

  config: {
    productLogo: <ConfluenceLogo size={'small'} />,
    requestTrial: {
      accessImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
      accessHeading: intl.formatMessage(messages.accessHeading),
      accessMessage: intl.formatMessage(messages.accessMessage),
      accessLearnMoreLink: 'https://www.atlassian.com/software/confluence',
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
          id="xflow.j2c.start-trial.confirm-trial.message"
          tagName="p"
          defaultMessage="Once your trial finishes, billing will start.{br}Easily cancel at any time in Manage subscriptions.{br}We'll email your billing contact 3 days in advance."
          values={{ br: <br /> }}
        />
      ),

      confirmReactivateHeading: intl.formatMessage(messages.confirmReactivateHeading),
      confirmReactivateMessage: (
        <div>
          <p>{intl.formatMessage(messages.confirmReactivateMessage0)}</p>
          <p>{intl.formatMessage(messages.confirmReactivateMessage1)}</p>
          <p>{intl.formatMessage(messages.confirmReactivateMessage2)}</p>
        </div>
      ),

      grantAccessHeading: intl.formatMessage(messages.grantAccessHeading),
      grantAccessDefaultAccess: intl.formatMessage(messages.grantAccessDefaultAccess),
      // grantAccessSelectLabel: intl.formatMessage(messages.grantAccessSelectLabel),
      grantAccessUserSelectPlaceholder: intl.formatMessage(
        messages.grantAccessUserSelectPlaceholder
      ),
      grantAccessDefaultSelectedRadio: 'everyone',
      grantAccessUsersOption: 'specific-users',
      grantAccessOptionItems: [
        {
          value: 'everyone',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelEveryone),
        },
        {
          value: 'site-admins',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelSiteAdmins),
        },
        {
          value: 'specific-users',
          label: intl.formatMessage(messages.grantAccessOptionItemsLabelSpecificUsers),
        },
      ],
      grantAccessLearnMoreLink: 'https://www.atlassian.com/software/confluence/pricing?tab=cloud',

      loadingProductHeading: intl.formatMessage(messages.loadingProductHeading),
      loadingProductMessage: intl.formatMessage(messages.loadingProductMessage),
      loadingProductGotoProductButton: intl.formatMessage(messages.loadingProductGotoProductButton),
      loadingProductHeaderImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg',

      alreadyStartedHeading: intl.formatMessage(messages.alreadyStartedHeading),

      alreadyStartedMessage: (
        <div>
          <p>{intl.formatMessage(messages.alreadyStartedMessage0)}</p>

          <p>{intl.formatMessage(messages.alreadyStartedMessage1)}</p>
        </div>
      ),
      alreadyStartedGetStartedButtonText: intl.formatMessage(
        messages.alreadyStartedGetStartedButtonText
      ),
    },
  },
  canCurrentUserAddProduct: isCurrentUserSiteAdmin,
  canCurrentUserGrantAccessToProducts: isCurrentUserSiteAdmin,

  requestTrialWithNote: productRequest(PRODUCT_KEY),
  cancelRequestTrial: async () => {},
  startProductTrial: startProductTrial(PRODUCT_KEY),
  cancelStartProductTrial: async () => {},
  productStatusChecker: productStatusChecker(PRODUCT_KEY),
  grantAccessToUsers: grantAccessToUsers('confluence-users', 'confluence'),
  retrieveUsers: retrieveUserManagementUsers(VALID_GROUPS),
  goToProduct: () => { window.top.location.href = '/wiki/'; },
  closeLoadingDialog: async () => {},
  closeAlreadyStartedDialog: async () => {},
  checkProductRequestFlag: () => getAlreadyRequestedFlag(PRODUCT_KEY),
  setProductRequestFlag: () => setAlreadyRequestedFlag(PRODUCT_KEY),
});

export default productXFlowProviderFactory(defaultProps);
