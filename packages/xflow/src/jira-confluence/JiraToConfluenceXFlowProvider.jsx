import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConfluenceLogo } from '@atlaskit/logo';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { XFlowProvider } from '../common/components/XFlowProvider';
import XFlowIntlProvider from '../common/components/XFlowIntlProvider';

import { isUserTrusted } from './tenantContext';
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
import confluenceStatusChecker from './confluenceStatusChecker';

const messages = defineMessages({
  // Start Trial
  // - Confirm Trial dialog
  confirmTrialHeading: {
    id: 'xflow.j2c.start-trial.confirm-trial.heading',
    defaultMessage: 'Start your 30 day trial',
  },

  // - Grant Access dialog
  grantAccessHeading: {
    id: 'xflow.j2c.start-trial.grant-access.heading',
    defaultMessage: 'Who should have access?',
  },
  grantAccessDefaultAccess: {
    id: 'xflow.j2c.start-trial.grant-access.default-access',
    defaultMessage: 'Everyone in JIRA will have access to Confluence.',
  },
  grantAccessOptionItemsLabelEveryone: {
    id: 'xflow.j2c.start-trial.grant-access.option.everyone',
    defaultMessage: 'Everyone in JIRA',
  },
  grantAccessOptionItemsLabelSiteAdmins: {
    id: 'xflow.j2c.start-trial.grant-access.option.site-admins',
    defaultMessage: 'Site admins only',
  },
  grantAccessOptionItemsLabelSpecificUsers: {
    id: 'xflow.j2c.start-trial.grant-access.option.specific-users',
    defaultMessage: 'Specific users',
  },
  grantAccessChooseOption: {
    id: 'xflow.j2c.start-trial.grant-access.choose-option',
    defaultMessage: 'Choose an option',
  },
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
    defaultMessage: 'Ask your admin for access',
  },
  accessMessage: {
    id: 'xflow.j2c.request-trial.access.message',
    defaultMessage: 'Send a request for your admin to activate confluence',
  },
  notePrompt: {
    id: 'xflow.j2c.request-trial.note.prompt',
    defaultMessage: 'Help your site administrator understand why you would like to use Confluence:',
  },
  notePlaceholder: {
    id: 'xflow.j2c.request-trial.note.placeholder',
    defaultMessage: 'I would like to try Confluence because…',
  },
});

export const defaultProps = intl => ({
  config: {
    productLogo: <ConfluenceLogo />,
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
          id="xflow.j2c.start-trial.confirm-trial.message"
          tagName="p"
          defaultMessage="Once your trial finishes, billing with start.{br}Easily cancel at any time in Manage application.{br}We'll email your billing contact 3 days in advance."
          values={{ br: <br /> }}
        />
      ),

      grantAccessHeading: intl.formatMessage(messages.grantAccessHeading),
      grantAccessDefaultAccess: intl.formatMessage(messages.grantAccessDefaultAccess),
      grantAccessChooseOption: intl.formatMessage(messages.grantAccessChooseOption),
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

      loadingProductHeading: intl.formatMessage(messages.loadingProductHeading),
      loadingProductMessage: intl.formatMessage(messages.loadingProductMessage),
      loadingProductGotoProductButton: intl.formatMessage(messages.loadingProductGotoProductButton),
      loadingProductHeaderImage:
        'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg',

      alreadyStartedHeading: intl.formatMessage(messages.alreadyStartedHeading),

      alreadyStartedMessage: (
        <FormattedMessage
          id="xflow.already-started.message"
          defaultMessage="A site administrator already started a trial.{br}{br}You’re all set to create vital project documentation with your team."
          values={{ br: <br /> }}
        />
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

const JiraToConfluenceXFlowProviderWithIntl = injectIntl(JiraToConfluenceXFlowProviderBase);

// eslint-disable-next-line react/no-multi-comp
export default class JiraToConfluenceXFlowProvider extends Component {
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
        <JiraToConfluenceXFlowProviderWithIntl {...otherProps} />
      </XFlowIntlProvider>
    );
  }
}
