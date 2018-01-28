import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ErrorFlag from '../../common/components/ErrorFlag';
import ContextualConfirmTrialContent from '../styled/ContextualConfirmTrialContent';
import CloseModalDialogButton from '../styled/CloseModalDialogButton';
import SpinnerDiv from '../../common/styled/SpinnerDiv';
import ContextualConfirmTrialHeader from '../styled/ContextualConfirmTrialHeader';
import ContextualConfirmTrialImage from '../styled/ContextualConfirmTrialImage';
import ContextualConfirmTrialFooter from '../styled/ContextualConfirmTrialFooter';
import ContextualConfirmTrialHeading from '../styled/ContextualConfirmTrialHeading';
import ContextualOptOutLinkButton from '../styled/ContextualOptOutLinkButton';
import ConfirmTrialAdminInfo from '../styled/ConfirmTrialAdminInfo';
import ConfirmTrialAdminInfoImage from '../styled/ConfirmTrialAdminInfoImage';
import OptOutLinkButton from '../styled/OptOutLinkButton';
import { withXFlowProvider } from '../../common/components/XFlowProvider';
import { INACTIVE, DEACTIVATED } from '../../common/productProvisioningStates';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.start-trial.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.start-trial.error-flag.description',
    defaultMessage: "Let's try that again.",
  },
});

class ContextualConfirmTrial extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string.isRequired,
      contextualMessage: PropTypes.string.isRequired,
      reactivateCTA: PropTypes.string.isRequired,
      trialCTA: PropTypes.string.isRequired,
    }).isRequired,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    status: PropTypes.oneOf([INACTIVE, DEACTIVATED]),

    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    startProductTrial: () => {},
    cancelStartProductTrial: () => {},
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    buttonsDisabled: this.props.buttonsDisabled,
    productFailedToStart: false,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE ? 'xflow.confirm-trial.displayed' : 'xflow.reactivate-trial.displayed'
    );
  }

  notifyDocumentOfConfirmClick = (status) => {
    const confirmClickedEvent = new CustomEvent('xflow.confirmClicked', {
      detail: {
        status,
      },
    });
    document.dispatchEvent(confirmClickedEvent);
  };

  handleConfirmClick = () => {
    const { status, startProductTrial, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.confirm-button.clicked'
        : 'xflow.reactivate-trial.confirm-button.clicked'
    );
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
      productFailedToStart: false,
    });

    this.notifyDocumentOfConfirmClick(status);

    return Promise.resolve(startProductTrial())
      .then(() => {
        firePrivateAnalyticsEvent(
          status === INACTIVE
            ? 'xflow.confirm-trial.start-product-trial.successful'
            : 'xflow.reactivate-trial.start-product-trial.successful'
        );
        return onComplete();
      })
      .catch(() => {
        firePrivateAnalyticsEvent(
          status === INACTIVE
            ? 'xflow.confirm-trial.start-product-trial.failed'
            : 'xflow.reactivate-trial.start-product-trial.failed'
        );
        this.setState({
          productFailedToStart: true,
          spinnerActive: false,
          buttonsDisabled: false,
        });
      });
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel, firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.cancel-button.clicked'
        : 'xflow.reactivate-trial.cancel-button.clicked'
    );
    return Promise.resolve(cancelStartProductTrial())
      .then(onCancel);
  };

  handleOptOutClick = () => {
    const { firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.opt-out-button.clicked'
        : 'xflow.reactivate-trial.opt-out-button.clicked'
    );
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
    });
    // Redirect to GAB, with opt-out parameter so the opt-out dialog opens
    window.location.href = `${window.location.origin}/admin/billing/addapplication?requestproductoptout=true`;
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.error-flag.dismissed'
        : 'xflow.reactivate-trial.error-flag.dismissed'
    );
    this.setState({
      productFailedToStart: false,
    });
  };

  renderHeader = (image, contextInfo) => (<div id="xflow-contextual-confirm-header">
    <CloseModalDialogButton id="xflow-confirm-trial-cancel-button" onClick={this.handleCancelClick} isDisabled={this.state.buttonsDisabled}>
      <CrossIcon
        label="Close Modal"
        primaryColor="white"
        size="medium"
      />
    </CloseModalDialogButton>
    <ContextualConfirmTrialHeader />
    <ContextualConfirmTrialImage src={contextInfo.contextualImage || image} alt="files" />
  </div>);

  renderInactiveFooter = () => (
    <ContextualConfirmTrialFooter>
      <ConfirmTrialAdminInfo>
        <ConfirmTrialAdminInfoImage imageType="card" />
        <FormattedMessage
          id="xflow.generic.confirm-trial.card-info"
          defaultMessage="Once your trial finishes, billing will start."
        />
      </ConfirmTrialAdminInfo>
      <ConfirmTrialAdminInfo>
        <ConfirmTrialAdminInfoImage imageType="email" />
        <FormattedMessage
          id="xflow.generic.confirm-trial.email-info"
          defaultMessage="Your billing contact will be emailed three days before."
        />
      </ConfirmTrialAdminInfo>
      <ConfirmTrialAdminInfo>
        <ConfirmTrialAdminInfoImage imageType="settings" />
        <FormattedMessage
          id="xflow.generic.confirm-trial.settings-info"
          defaultMessage="Cancel your trial at any time in {manageApplicationsLink}."
          values={{
            manageApplicationsLink: this.renderManageApplicationsLink(),
          }}
        />
      </ConfirmTrialAdminInfo>
    </ContextualConfirmTrialFooter>
  );

  renderReactivateFooter = () => (
    <ContextualConfirmTrialFooter>
      <ConfirmTrialAdminInfo columnSize="medium">
        <ConfirmTrialAdminInfoImage imageType="card" />
        <FormattedMessage
          id="xflow.generic.confirm-reactivation.card-info"
          defaultMessage="Once your subscription reactivates, billing will resume."
        />
      </ConfirmTrialAdminInfo>
      <ConfirmTrialAdminInfo columnSize="medium">
        <ConfirmTrialAdminInfoImage imageType="settings" />
        <FormattedMessage
          id="xflow.generic.confirm-reactivation.settings-info"
          defaultMessage="Cancel your subscription at any time in {manageApplicationsLink}."
          values={{
            manageApplicationsLink: this.renderManageApplicationsLink(),
          }}
        />
      </ConfirmTrialAdminInfo>
    </ContextualConfirmTrialFooter>
  );

  renderManageApplicationsLink = () => {
    const { status, firePrivateAnalyticsEvent } = this.props;
    return (
      <a
        href="/admin/billing/applications"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => firePrivateAnalyticsEvent(
          status === INACTIVE
            ? 'xflow.confirm-trial.manage-subscriptions.clicked'
            : 'xflow.reactivate-trial.manage-subscriptions.clicked'
        )}
      >
        <FormattedMessage
          id="xflow.generic.confirm-trial.settings-info.manage-applications.link"
          defaultMessage="Manage subscriptions"
        />
      </a>
    );
  }

  renderFooter = (status) => (status === INACTIVE
    ? this.renderInactiveFooter()
    : this.renderReactivateFooter());

  renderContextualContent = (status, contextInfo) => (<ContextualConfirmTrialContent id="xflow-confirm-trial">
    <ContextualConfirmTrialHeading>
      {contextInfo.contextualHeading}
    </ContextualConfirmTrialHeading>
    <p>{contextInfo.contextualMessage}</p>
    <SpinnerDiv topMultiplier={2}>
      <Spinner isCompleting={!this.state.spinnerActive} />
    </SpinnerDiv>
    <Button
      id="xflow-confirm-trial-confirm-button"
      onClick={this.handleConfirmClick}
      appearance="primary"
      isDisabled={this.state.buttonsDisabled}
    >
      {status === INACTIVE ? contextInfo.trialCTA : contextInfo.reactivateCTA}
    </Button>
    <br />
    <ContextualOptOutLinkButton
      id="xflow-opt-out-button"
      onClick={this.handleOptOutClick}
    >
      Turn off these messages
    </ContextualOptOutLinkButton>
  </ContextualConfirmTrialContent>);

  render() {
    const {
      intl,
      status,
      image,
      contextInfo,
    } = this.props;
    return (
      <ModalDialog
        isOpen
        width="medium"
        height={'580px'}
        header={
          this.renderHeader(image, contextInfo)
        }
        footer={
          this.renderFooter(status)
        }
      >
        {this.renderContextualContent(status, contextInfo)}
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.productFailedToStart}
          source={status === INACTIVE
            ? 'confirm-trial'
            : 'reactivate-trial'}
          onDismissed={this.handleErrorFlagDismiss}
        />
      </ModalDialog>
    );
  }
}

export const ContextualConfirmTrialBase = withAnalytics(injectIntl(ContextualConfirmTrial));

export default withXFlowProvider(
  ContextualConfirmTrialBase,
  ({
     xFlow: {
       config: {
         contextualStartTrial: {
           contextualStartTrialHeader,
         },
       },
       status,
       startProductTrial,
       cancelStartProductTrial,
     },
   }) => ({
     startProductTrial,
     cancelStartProductTrial,
     status,
     image: contextualStartTrialHeader,
   })
);
