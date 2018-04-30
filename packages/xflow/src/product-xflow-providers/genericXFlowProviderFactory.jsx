import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { isCurrentUserSiteAdmin } from '../common/services/tenantContext';
import productXFlowProviderFactory from '../common/productXFlowProviderFactory';

import productStatusChecker from '../common/services/productStatusChecker';
import startProductTrial from '../common/services/startProductTrial';
import productRequest from '../common/services/productRequest';
import { setAlreadyRequestedFlag, getAlreadyRequestedFlag } from '../common/services/alreadyRequestedFlag';

import JiraToConfluenceXFlowProvider from './JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from './JiraToJSDXFlowProvider';
import JiraToJSWXFlowProvider from './JiraToJSWXFlowProvider';
import JiraToJCXFlowProvider from './JiraToJCXFlowProvider';

const deepMerge = (source, mixin = {}) => {
  let target = { ...source };
  Object
    .keys(mixin)
    .forEach((key) => {
      const override = mixin[key];
      if (typeof override === 'object' && typeof target[key] === 'object') {
        if (override.$$typeof) {
          target[key] = override;
        } else {
          target = { ...target, [key]: deepMerge(target[key], override) };
        }
      } else {
        target[key] = override;
      }
    });
  return target;
};

const genericXFlowFactory = (PRODUCT_KEY, options) => {
  switch (PRODUCT_KEY) {
    case 'confluence.ondemand':
      return JiraToConfluenceXFlowProvider;
    case 'jira-core.ondemand':
      return JiraToJCXFlowProvider;
    case 'jira-servicedesk.ondemand':
      return JiraToJSDXFlowProvider;
    case 'jira-software.ondemand':
      return JiraToJSWXFlowProvider;
    default: /* nop */
  }

  const messages = defineMessages({
    // Start Trial
    // - Confirm Trial dialog
    confirmTrialHeading: {
      id: 'xflow.generic.start-trial.confirm-trial.heading',
      defaultMessage: 'Start your 30 day trial',
    },
    confirmReactivateHeading: {
      id: 'xflow.generic.start-trial.reactivate-trial.heading',
      defaultMessage: 'Welcome back',
    },
    confirmReactivateMessage0: {
      id: 'xflow.generic.start-trial.reactivate-trial.message.p0',
      defaultMessage: 'If your instance is eligible for a trial, it will be free for 30 days.',
    },
    confirmReactivateMessage1: {
      id: 'xflow.generic.start-trial.reactivate-trial.message.p1',
      defaultMessage: 'Otherwise, billing will start immediately.',
    },
    confirmReactivateMessage2: {
      id: 'xflow.generic.start-trial.reactivate-trial.message.p1',
      defaultMessage:
        "We'll email your billing contact 10 days prior to the due date with any new charges.",
    },

    // - Loading Time dialog
    loadingProductGotoProductButton: {
      id: 'xflow.generic.start-trial.loading-product-trial.goto-button',
      defaultMessage: 'Create a project',
    },

    // - Already Started dialog
    alreadyStartedHeading: {
      id: 'xflow.generic.start-trial.already-started.heading',
      defaultMessage: 'You already have this product',
    },
    alreadyStartedMessage0: {
      id: 'xflow.generic.start-trial.already-started.message.p0',
      defaultMessage: 'A site administrator already started a trial.',
    },
    alreadyStartedMessage1: {
      id: 'xflow.generic.start-trial.already-started.message.p1',
      defaultMessage: '',
    },
    alreadyStartedGetStartedButtonText: {
      id: 'xflow.generic.start-trial.already-started.get-started-button',
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
  });

  /* eslint max-len: ["error", { "code": 200 }]*/

  const defaults = intl => ({
    productKey: PRODUCT_KEY,
    config: {
      productLogo: () => 'define a product logo',
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
            id="xflow.generic.start-trial.confirm-trial.message"
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
    canCurrentUserAddProduct: isCurrentUserSiteAdmin,
    canCurrentUserGrantAccessToProducts: isCurrentUserSiteAdmin,

    requestTrialWithNote: productRequest(PRODUCT_KEY),
    cancelRequestTrial: async () => {},

    startProductTrial: startProductTrial(PRODUCT_KEY),
    cancelStartProductTrial: async () => {},
    productStatusChecker: productStatusChecker(PRODUCT_KEY, () => Promise.resolve(true)),
    goToProduct: 'defineGoToFunction',

    closeLoadingDialog: async () => {},
    closeAlreadyStartedDialog: async () => {},
    checkProductRequestFlag: () => getAlreadyRequestedFlag(PRODUCT_KEY),
    setProductRequestFlag: () => setAlreadyRequestedFlag(PRODUCT_KEY),

    // Grant Access has not been developed for Core. Do not activate in Production.
    grantAccessEnabled: false,
  });

  const defaultProps = intl => (deepMerge(defaults(intl), options));

  return productXFlowProviderFactory(defaultProps);
};

export default genericXFlowFactory;
