import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ErrorFlag from '../../common/components/ErrorFlag';

import SpinnerDiv from '../../common/styled/SpinnerDiv';
import OptOutLinkButton from '../styled/OptOutLinkButton';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialHeading from '../styled/StartTrialHeading';
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
  optOutMessage: {
    id: 'xflow.generic.start-trial.opt-out.message',
    defaultMessage: 'Turn off these messages',
  },
});

class ConfirmTrial extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,

    trialHeading: PropTypes.string.isRequired,
    trialMessage: PropTypes.node.isRequired,
    reactivateHeading: PropTypes.string.isRequired,
    reactivateMessage: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    status: PropTypes.oneOf([INACTIVE, DEACTIVATED]),

    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isCrossSell: PropTypes.bool,

    intl: intlShape.isRequired,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
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
    window.location.href = '/admin/billing/addapplication?requestproductoptout=true';
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

  handleDialogClosed = () => {
    const { firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(
      status === INACTIVE
        ? 'xflow.confirm-trial.dialog.closed'
        : 'xflow.reactivate-trial.dialog.closed'
    );
  }

  header = () => {
    const { productLogo } = this.props;
    return <StartTrialHeader>{productLogo}</StartTrialHeader>;
  }

  footer = () => (
    <StartTrialFooter>
      <SpinnerDiv>
        <Spinner isCompleting={!this.state.spinnerActive} />
      </SpinnerDiv>
      <Button
        id="xflow-confirm-trial-confirm-button"
        onClick={this.handleConfirmClick}
        appearance="primary"
        isDisabled={this.state.buttonsDisabled}
      >
        <FormattedMessage
          id="xflow.generic.confirm-trial.confirm-button"
          defaultMessage="Confirm"
        />
      </Button>
      <Button
        id="xflow-confirm-trial-cancel-button"
        onClick={this.handleCancelClick}
        appearance="subtle-link"
        isDisabled={this.state.buttonsDisabled}
      >
        <FormattedMessage
          id="xflow.generic.confirm-trial.cancel-button"
          defaultMessage="Cancel"
        />
      </Button>
    </StartTrialFooter>)

  render() {
    const {
      intl,
      status,
      trialHeading,
      trialMessage,
      reactivateHeading,
      reactivateMessage,
      isCrossSell,
    } = this.props;
    return (
      <ModalDialog
        isOpen
        width="small"
        header={this.header}
        footer={this.footer}
        onClose={this.handleDialogClosed}
        shouldCloseOnEscapePress={false}
        shouldCloseOnOverlayClick={false}
      >
        <div id="xflow-confirm-trial">
          <StartTrialHeading>
            {status === INACTIVE ? trialHeading : reactivateHeading}
          </StartTrialHeading>
          {status === INACTIVE ? trialMessage : reactivateMessage}
        </div>
        {isCrossSell === true &&
          <OptOutLinkButton
            id="xflow-opt-out-button"
            onClick={this.handleOptOutClick}
          >
            {intl.formatMessage(messages.optOutMessage)}
          </OptOutLinkButton>
        }
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

export const ConfirmTrialBase = withAnalytics(injectIntl(ConfirmTrial));

export default withXFlowProvider(
  ConfirmTrialBase,
  ({
    xFlow: {
      config: {
        productLogo,
        startTrial: {
          confirmTrialHeading,
          confirmTrialMessage,
          confirmReactivateHeading,
          confirmReactivateMessage,
        },
      },
      status,
      startProductTrial,
      cancelStartProductTrial,
    },
  }) => ({
    productLogo,
    startProductTrial,
    cancelStartProductTrial,
    status,
    trialHeading: confirmTrialHeading,
    trialMessage: confirmTrialMessage,
    reactivateHeading: confirmReactivateHeading,
    reactivateMessage: confirmReactivateMessage,
  })
);
