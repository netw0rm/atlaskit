import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ErrorFlag from './ErrorFlag';
import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withXFlowProvider } from '../../common/components/XFlowProvider';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.start-trial.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.start-tral.error-flag.description',
    defaultMessage: 'Let\'s try that again.',
  },
});

class ConfirmTrial extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    productLogo: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    confirmButtonDisabled: this.props.confirmButtonDisabled,
    confluenceFailedToStart: false,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.confirm-trial.displayed');
  }

  handleConfirmClick = () => {
    const { startProductTrial, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.confirm-trial.confirm-button.clicked');
    this.setState({
      spinnerActive: true,
      confirmButtonDisabled: true,
      confluenceFailedToStart: false,
    });

    startProductTrial()
      .then(() => onComplete())
      .catch(() => {
        this.setState({
          confluenceFailedToStart: true,
          spinnerActive: false,
          confirmButtonDisabled: false,
        });
      });
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.confirm-trial.cancel-button.clicked');
    cancelStartProductTrial()
      .then(onCancel);
  };

  render() {
    const {
      intl,
      productLogo,
      heading,
      message,
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
              isDisabled={this.state.confirmButtonDisabled}
            >
              <FormattedMessage id="xflow.generic.confirm-trial.confirm-button" defaultMessage="Confirm" />
            </Button>
            <Button
              id="xflow-confirm-trial-cancel-button"
              onClick={this.handleCancelClick}
              appearance="subtle-link"
            >
              <FormattedMessage id="xflow.generic.confirm-trial.cancel-button" defaultMessage="Cancel" />
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog id="xflow-confirm-trial">
          <StartTrialHeader>
            { heading }
          </StartTrialHeader>
          { message }
        </StartTrialDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.confluenceFailedToStart}
          onDismissed={() => this.setState({ confluenceFailedToStart: false })}
        />
      </ModalDialog>
    );
  }
}

export const ConfirmTrialBase = withAnalytics(injectIntl(ConfirmTrial));

export default withXFlowProvider(
  ConfirmTrialBase,
  ({ xFlow: {
    config: {
      productLogo,
      startTrial: {
        trialHeading,
        trialMessage,
    },
    },
    startProductTrial,
    cancelStartProductTrial,
  } }) => ({
    productLogo,
    startProductTrial,
    cancelStartProductTrial,
    heading: trialHeading,
    message: trialMessage,
  })
);
