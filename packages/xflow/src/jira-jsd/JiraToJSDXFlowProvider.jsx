import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { JiraServiceDeskLogo } from '@atlaskit/logo';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { XFlowProvider } from '../common/components/XFlowProvider';
import XFlowIntlProvider from '../common/components/XFlowIntlProvider';

import { isUserTrusted } from './../common/tenantContext';
import requestTrialAccess from './requestTrialAccess';
import requestTrialAccessWithNote from './requestTrialAccessWithNote';
import requestTrialAccessWithoutNote from './requestTrialAccessWithoutNote';
import cancelRequestTrialAccess from './cancelRequestTrialAccess';
import startJSDTrial from './startJSDTrial';
import cancelStartProductTrial from './cancelStartProductTrial';
import grantAccessToUsers from './grantAccessToUsers';
import retrieveJiraUsers from './retrieveJiraUsers';
import goToProduct from './goToProduct';
import closeLoadingDialog from './closeLoadingDialog';
import closeAlreadyStartedDialog from './closeAlreadyStartedDialog';
import jsdStatusChecker from './jsdStatusChecker';

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
  loadingProductHeading: {
    id: 'xflow.j2jsd.start-trial.loading-product-trial.heading',
    defaultMessage: ' ',
  },
  loadingProductMessage: {
    id: 'xflow.j2jsd.start-trial.loading-product-trial.message',
    defaultMessage: ' ',
  },
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
    defaultMessage: 'Ask your admin for access',
  },
  accessMessage: {
    id: 'xflow.j2jsd.request-trial.access.message',
    defaultMessage: 'Send a request for your admin to activate Jira Service Desk',
  },
  notePrompt: {
    id: 'xflow.j2jsd.request-trial.note.prompt',
    defaultMessage: 'Help your site administrator understand why you would like to use Jira Service Desk:',
  },
  notePlaceholder: {
    id: 'xflow.j2jsd.request-trial.note.placeholder',
    defaultMessage: 'I would like to try Jira Service Desk because…',
  },
  notePlaceholderShort: {
    id: 'xflow.j2c.request-trial.note.placeholder.short',
    defaultMessage: "Hi! I'd like to try Jira Service Desk.",
  },
});

export const defaultProps = intl => ({
  config: {
    productLogo: <JiraServiceDeskLogo />,
    requestTrial: {
      accessImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
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

      loadingProductHeading: intl.formatMessage(messages.loadingProductHeading),
      loadingProductMessage: intl.formatMessage(messages.loadingProductMessage),
      loadingProductGotoProductButton: intl.formatMessage(messages.loadingProductGotoProductButton),
      loadingProductHeaderImage: '',

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

  requestTrialAccess,
  requestTrialAccessWithNote,
  requestTrialAccessWithoutNote,
  cancelRequestTrialAccess,

  startProductTrial: startJSDTrial,
  cancelStartProductTrial,
  productStatusChecker: jsdStatusChecker,
  grantAccessToUsers,
  retrieveUsers: retrieveJiraUsers,
  goToProduct,
  closeLoadingDialog,
  closeAlreadyStartedDialog,
  checkProductRequestFlag: () => (false),
  setProductRequestFlag: () => { /* do nothing */ },
});

export class JiraToJSDXFlowProviderBase extends Component {
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

const JiraToJSDXFlowProviderWithIntl = injectIntl(JiraToJSDXFlowProviderBase);

// eslint-disable-next-line react/no-multi-comp
export default class JiraToJSDXFlowProvider extends Component {
  static propTypes = {
    locale: PropTypes.string,
  };

  static defaultProps = {
    locale: 'en_US',
  };

  render() {
    const { locale, ...otherProps } = this.props;

    return (
      <XFlowIntlProvider locale={locale}>
        <JiraToJSDXFlowProviderWithIntl {...otherProps} />
      </XFlowIntlProvider>
    );
  }
}
