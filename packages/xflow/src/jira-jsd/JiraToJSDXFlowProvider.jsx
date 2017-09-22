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
    defaultMessage: 'Everyone in JIRA',
  },
  grantAccessOptionItemsLabelSiteAdmins: {
    id: 'xflow.j2jsd.start-trial.grant-access.option.site-admins',
    defaultMessage: 'Site admins only',
  },
  grantAccessOptionItemsLabelSpecificUsers: {
    id: 'xflow.j2jsd.start-trial.grant-access.option.specific-users',
    defaultMessage: 'Specific users',
  },
  grantAccessSelectLabel: {
    id: 'xflow.j2jsd.start-trial.grant-access.select-label',
    defaultMessage: 'Who can start solving problems in JIRA Service Desk?',
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
    defaultMessage: 'You’re all set to create vital project documentation with your team.',
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
    defaultMessage: 'Send a request for your admin to activate confluence',
  },
  notePrompt: {
    id: 'xflow.j2jsd.request-trial.note.prompt',
    defaultMessage: 'Help your site administrator understand why you would like to use Jira Service Desk:',
  },
  notePlaceholder: {
    id: 'xflow.j2jsd.request-trial.note.placeholder',
    defaultMessage: 'I would like to try Jira Service Desk because…',
  },
});

export const defaultProps = intl => ({
  config: {
    productLogo: <JiraServiceDeskLogo />,
    requestTrial: {
      accessBanner: 'https://placehold.it/352x214',
      accessHeading: intl.formatMessage(messages.accessHeading),
      accessMessage: intl.formatMessage(messages.accessMessage),
      notePrompt: intl.formatMessage(messages.notePrompt),
      notePlaceholder: intl.formatMessage(messages.notePlaceholder),
    },
    startTrial: {
      confirmTrialHeading: intl.formatMessage(messages.confirmTrialHeading),
      confirmTrialMessage: (
        <FormattedMessage
          id="xflow.j2jsd.start-trial.confirm-trial.message"
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
      grantAccessShowNotifyUsersOption: false,
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
