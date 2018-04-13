import React from 'react';
import { JiraCoreLogo } from '@atlaskit/logo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { canUserAddProduct } from '../common/services/tenantContext';
import productXFlowProviderFactory from '../common/productXFlowProviderFactory';
import grantAccessToUsers from '../common/services/grantAccessToUsers';
import productStatusChecker from '../common/services/productStatusChecker';
import startProductTrial from '../common/services/startProductTrial';
import productRequest from '../common/services/productRequest';
import { setAlreadyRequestedFlag, getAlreadyRequestedFlag } from '../common/services/alreadyRequestedFlag';
import retrieveUsers from '../common/services/retrieveUsers';
import retrieveAdminIds from '../common/services/retrieveAdminIds';

const PRODUCT_KEY = 'jira-core.ondemand';

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
      "We'll email your billing contact 10 days prior to the due date with any new charges.",
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

  // - Grant Access dialog
  grantAccessHeading: {
    id: 'xflow.j2jc.start-trial.grant-access.heading',
    defaultMessage: 'Who should have access?',
  },
  grantAccessDefaultAccess: {
    id: 'xflow.j2jc.start-trial.grant-access.default-access',
    defaultMessage: 'Everyone will have access to Jira Core.',
  },
  grantAccessOptionItemsLabelEveryone: {
    id: 'xflow.j2jc.start-trial.grant-access.option.everyone',
    defaultMessage: 'Everyone',
  },
  grantAccessOptionItemsLabelSiteAdmins: {
    id: 'xflow.j2jc.start-trial.grant-access.option.site-admins',
    defaultMessage: 'Site admins only',
  },
  grantAccessOptionItemsLabelSpecificUsers: {
    id: 'xflow.j2jc.start-trial.grant-access.option.specific-users',
    defaultMessage: 'Specific users',
  },
  grantAccessUserSelectPlaceholder: {
    id: 'xflow.j2jc.start-trial.grant-access.select-placeholder',
    defaultMessage: 'Start typing a username',
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
});

export const defaultProps = intl => ({
  productKey: PRODUCT_KEY,

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
          defaultMessage="Once your trial finishes, billing will start.{br}Easily cancel at any time in Manage applications.{br}We'll email your billing contact 10 days in advance."
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
      grantAccessDefaultAccess: intl.formatMessage(messages.grantAccessDefaultAccess),
      grantAccessShowNotifyUsersOption: false,
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
  canCurrentUserAddProduct: canUserAddProduct,
  canCurrentUserGrantAccessToProducts: canUserAddProduct,

  requestTrialWithNote: productRequest(PRODUCT_KEY),
  cancelRequestTrial: async () => {},

  startProductTrial: startProductTrial(PRODUCT_KEY),
  cancelStartProductTrial: async () => {},
  productStatusChecker: productStatusChecker(PRODUCT_KEY),
  grantAccessToUsers: grantAccessToUsers('jira-core-users', 'Jira Core', 'Grants access to Jira Core'),
  retrieveUsers,
  retrieveAdminIds,
  goToProduct: () => {
    window.top.location.href = '/secure/LandingPage.jspa?product=jira-core';
  },
  closeLoadingDialog: async () => {},
  closeAlreadyStartedDialog: async () => {},
  checkProductRequestFlag: () => getAlreadyRequestedFlag(PRODUCT_KEY),
  setProductRequestFlag: () => setAlreadyRequestedFlag(PRODUCT_KEY),
});

export default productXFlowProviderFactory(defaultProps);
