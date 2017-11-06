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
import ConfirmTrialAdminInfo from '../styled/ConfirmTrialAdminInfo';
import ConfirmTrialAdminInfoImage from '../styled/ConfirmTrialAdminInfoImage';
import { withXFlowProvider } from '../../common/components/XFlowProvider';
import { INACTIVE, DEACTIVATED } from '../../common/productProvisioningStates';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.start-trial.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.start-tral.error-flag.description',
    defaultMessage: "Let's try that again.",
  },
});

class ContextualConfirmTrial extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    image: PropTypes.string.isRequired,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
    status: PropTypes.oneOf([INACTIVE, DEACTIVATED]),
    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualMessage: PropTypes.string.isRequired,
      reactivateCTA: PropTypes.string.isRequired,
      trialCTA: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
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

    startProductTrial()
      .then(() => {
        firePrivateAnalyticsEvent(
          status === INACTIVE
            ? 'xflow.confirm-trial.start-product-trial.successful'
            : 'xflow.reactivate-trial.start-product-trial.successful'
        );
        onComplete();
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

    this.notifyDocumentOfConfirmClick(status);
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel, firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.cancel-button.clicked'
        : 'xflow.reactivate-trial.cancel-button.clicked'
    );
    cancelStartProductTrial().then(onCancel);
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
          defaultMessage="Cancel your trial at any time in Manage applications."
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
          defaultMessage="Once you reactivate a subscription, billing will start at the end of your chosen billing cycle."
        />
      </ConfirmTrialAdminInfo>
      <ConfirmTrialAdminInfo columnSize="medium">
        <ConfirmTrialAdminInfoImage imageType="settings" />
        <FormattedMessage
          id="xflow.generic.confirm-reactivation.settings-info"
          defaultMessage="Cancel your subscription at any time in Manage applications."
        />
      </ConfirmTrialAdminInfo>
    </ContextualConfirmTrialFooter>
  );

  renderFooter = (status) => (status === INACTIVE
    ? this.renderInactiveFooter()
    : this.renderReactivateFooter());

  renderContextualContent = (status, contextInfo) => (<ContextualConfirmTrialContent id="xflow-confirm-trial">
    <h2>
      {contextInfo.contextualMessage}
    </h2>
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
        height={'510px'}
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

export const ConfirmTrialBase = withAnalytics(injectIntl(ContextualConfirmTrial));

export default withXFlowProvider(
  ConfirmTrialBase,
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
