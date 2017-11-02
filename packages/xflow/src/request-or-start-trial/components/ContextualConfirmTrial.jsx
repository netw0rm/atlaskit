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
import StartTrialHeader from '../styled/StartTrialHeader';
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
    trialHeading: PropTypes.string.isRequired,
    reactivateHeading: PropTypes.string.isRequired,
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

  render() {
    const {
      intl,
      status,
      image,
      trialHeading,
      reactivateHeading,
    } = this.props;
    return (
      <ModalDialog
        isOpen
        width="medium"
        height={'510px'}
        header={
          <div id="xflow-contextual-confirm-header">
            <CloseModalDialogButton id="xflow-confirm-trial-cancel-button" onClick={this.handleCancelClick} isDisabled={this.state.buttonsDisabled}>
              <CrossIcon
                label="Close Modal"
                primaryColor="white"
                size="medium"
              />
            </CloseModalDialogButton>
            <ContextualConfirmTrialHeader />
            <ContextualConfirmTrialImage src={image} alt="files" />
          </div>
        }
        footer={
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
        }
      >
        <ContextualConfirmTrialContent id="xflow-confirm-trial">
          <StartTrialHeader>
            {status === INACTIVE ? trialHeading : reactivateHeading}
          </StartTrialHeader>
          <SpinnerDiv>
            <Spinner isCompleting={!this.state.spinnerActive} />
          </SpinnerDiv>
          <Button
            id="xflow-confirm-trial-confirm-button"
            onClick={this.handleConfirmClick}
            appearance="primary"
            isDisabled={this.state.buttonsDisabled}
          >
            {status === INACTIVE ? trialHeading : reactivateHeading}
          </Button>
        </ContextualConfirmTrialContent>
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
         startTrial: {
           confirmTrialHeading,
           confirmReactivateHeading,
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
     trialHeading: confirmTrialHeading,
     reactivateHeading: confirmReactivateHeading,
   })
);
