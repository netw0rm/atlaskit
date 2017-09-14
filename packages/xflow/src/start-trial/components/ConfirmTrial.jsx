import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ErrorFlag from './ErrorFlag';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
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

class ConfirmTrial extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    productLogo: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
    status: PropTypes.oneOf([INACTIVE, DEACTIVATED]),
    trialHeading: PropTypes.string.isRequired,
    trialMessage: PropTypes.node.isRequired,
    reactivateHeading: PropTypes.string.isRequired,
    reactivateMessage: PropTypes.node.isRequired,
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
    firePrivateAnalyticsEvent(status === INACTIVE ?
      'xflow.confirm-trial.displayed' :
      'xflow.reactivate-trial.displayed');
  }

  handleConfirmClick = () => {
    const { status, startProductTrial, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent(status === INACTIVE ?
      'xflow.confirm-trial.confirm-button.clicked' :
      'xflow.reactivate-trial.confirm-button.clicked');
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
      productFailedToStart: false,
    });

    startProductTrial()
      .then(() => {
        firePrivateAnalyticsEvent(status === INACTIVE ?
          'xflow.confirm-trial.start-product-trial.successful' :
          'xflow.reactivate-trial.start-product-trial.successful');
        onComplete();
      })
      .catch(() => {
        firePrivateAnalyticsEvent(status === INACTIVE ?
          'xflow.confirm-trial.start-product-trial.failed' :
          'xflow.reactivate-trial.start-product-trial.failed');
        this.setState({
          productFailedToStart: true,
          spinnerActive: false,
          buttonsDisabled: false,
        });
      });
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel, firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(status === INACTIVE ?
      'xflow.confirm-trial.cancel-button.clicked' :
      'xflow.reactivate-trial.cancel-button.clicked');
    cancelStartProductTrial().then(onCancel);
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, status } = this.props;
    firePrivateAnalyticsEvent(status === INACTIVE ?
      'xflow.confirm-trial.error-flag.dismissed' :
      'xflow.reactivate-trial.error-flag.dismissed');
    this.setState({
      productFailedToStart: false,
    });
  };

  render() {
    const {
      intl,
      productLogo,
      status,
      trialHeading,
      trialMessage,
      reactivateHeading,
      reactivateMessage,
    } = this.props;
    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
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
          </StartTrialFooter>
        }
      >
        <div id="xflow-confirm-trial">
          <StartTrialHeader>
            {status === INACTIVE ? trialHeading : reactivateHeading}
          </StartTrialHeader>
          {status === INACTIVE ? trialMessage : reactivateMessage}
        </div>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.productFailedToStart}
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
