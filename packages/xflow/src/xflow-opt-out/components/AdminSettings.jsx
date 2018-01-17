import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { withAnalytics } from '@atlaskit/analytics';
import { colors } from '@atlaskit/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';

import ErrorFlag from '../../common/components/ErrorFlag';
import SuccessFlag from '../../common/components/SuccessFlag';

import OptOutHeader from '../styled/OptOutHeader';
import OptOutFooter from '../styled/OptOutFooter';
import OptOutIcon from '../styled/OptOutIcon';
import OptOutMessage from '../styled/OptOutMessage';
import OptOutNoteDiv from '../styled/OptOutNoteDiv';
import OptOutNoteText from '../styled/OptOutNoteText';
import SpinnerDiv from '../../common/styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.opt-out.error-flag.title',
    defaultMessage: 'Oops... something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.opt-out.error-flag.description',
    defaultMessage: "That setting wasn't saved.",
  },
  errorFlagResendRequest: {
    id: 'xflow.generic.opt-out.error-flag.resend-request',
    defaultMessage: 'Try again',
  },
  errorFlagNotNow: {
    id: 'xflow.generic.opt-out.error-flag.not-now',
    defaultMessage: 'Not now',
  },
  successFlagTitle: {
    id: 'xflow.generic.opt-out.success-flag.title',
    defaultMessage: 'You have opted out',
  },
  successFlagDescription: {
    id: 'xflow.generic.opt-out.success-flag.description',
    defaultMessage: 'You will no longer receive product trial requests!',
  },
});

class AdminSettings extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    messageWarning: PropTypes.string.isRequired,
    notePlaceholder: PropTypes.string.isRequired,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,

    optOutRequestTrialFeature: PropTypes.func,
    cancelOptOut: PropTypes.func,
    onComplete: PropTypes.func.isRequired,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    spinnerActive: false,
    buttonsDisabled: false,
    optOutRequestTrialFeature: () => {},
    cancelOptOut: () => {},
  };

  state = {
    isOpen: true,
    spinnerActive: this.props.spinnerActive,
    buttonsDisabled: this.props.buttonsDisabled,
    selectedRadio: this.props.defaultSelectedRadio,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.displayed');
  }

  handleSendOptOutRequest = async () => {
    const { firePrivateAnalyticsEvent, optOutRequestTrialFeature } = this.props;
    const { selectedRadio } = this.state;

    try {
      await optOutRequestTrialFeature(selectedRadio);
      firePrivateAnalyticsEvent('xflow.opt-out.request.successful');
      this.setState({
        optOutRequestStatus: 'successful',
        isOpen: false,
      });
    } catch (e) {
      firePrivateAnalyticsEvent('xflow.opt-out.request.failed', {
        errorMessage: e.message,
      });
      this.setState({
        spinnerActive: false,
        buttonsDisabled: false,
        isOpen: false,
        optOutRequestStatus: 'failed',
      });
    }
  };

  handleTurnOffClick= async () => {
    const { firePrivateAnalyticsEvent } = this.props;
    const { selectedRadio } = this.state;
    const OptOutNoteTextValue = this.noteText.value;

    firePrivateAnalyticsEvent('xflow.opt-out.turn-off-button.clicked', {
      selectedRadio,
      OptOutNoteText: OptOutNoteTextValue,
    });
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
    });
    return this.handleSendOptOutRequest();
  };

  handleCancelClick = async () => {
    const { firePrivateAnalyticsEvent, cancelOptOut } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.cancel-button.clicked');
    this.setState({
      optOutRequestStatus: null,
      isOpen: false,
    });
    await cancelOptOut();
  };

  handleErrorFlagResendRequest = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.error-flag.resend-request');
    this.setState({
      optOutRequestStatus: null,
    });
    return this.handleSendOptOutRequest();
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.error-flag.dismissed');
    this.setState({
      optOutRequestStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  handleSuccessFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.success-flag.dismissed');
    this.setState({
      optOutRequestStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  render() {
    const { intl, heading, message, messageWarning, notePlaceholder } = this.props;
    const { optOutRequestStatus } = this.state;

    return (
      <div id="xflow-opt-out">
        <ModalDialog
          isOpen={this.state.isOpen}
          width="small"
          header={<OptOutHeader><OptOutIcon><ErrorIcon label="Error icon" primaryColor={colors.R400} /></OptOutIcon>{heading}</OptOutHeader>}
          footer={
            <OptOutFooter>
              <SpinnerDiv>
                <Spinner isCompleting={!this.state.spinnerActive} />
              </SpinnerDiv>
              <Button
                id="xflow-opt-out-turn-off-button"
                onClick={this.handleTurnOffClick}
                appearance="danger"
                isDisabled={this.state.buttonsDisabled}
              >
                <FormattedMessage
                  id="xflow-generic.opt-out.turn-off-button"
                  defaultMessage="Turn off"
                />
              </Button>
              <Button
                onClick={this.handleCancelClick}
                appearance="subtle-link"
                isDisabled={this.state.buttonsDisabled}
              >
                <FormattedMessage
                  id="xflow-generic.opt-out.cancel-button"
                  defaultMessage="Cancel"
                />
              </Button>
            </OptOutFooter>
          }
        >
          <OptOutMessage>{message}</OptOutMessage>
          <OptOutMessage>{messageWarning}</OptOutMessage>
          <OptOutNoteDiv>
            <OptOutNoteText
              innerRef={noteText => {
                this.noteText = noteText;
              }}
              placeholder={notePlaceholder}
              maxLength={300}
            />
          </OptOutNoteDiv>
        </ModalDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={optOutRequestStatus === 'failed'}
          source="opt-out"
          flagActions={[
            {
              content: intl.formatMessage(messages.errorFlagResendRequest),
              onClick: this.handleErrorFlagResendRequest,
            },
            { content: intl.formatMessage(messages.errorFlagNotNow),
              onClick: this.handleErrorFlagDismiss,
            },
          ]}
        />
        <SuccessFlag
          title={intl.formatMessage(messages.successFlagTitle)}
          description={intl.formatMessage(messages.successFlagDescription)}
          showFlag={optOutRequestStatus === 'successful'}
          source="opt-out"
          onDismissed={this.handleSuccessFlagDismiss}
        />
      </div>
    );
  }
}

export const AdminSettingsBase = withAnalytics(injectIntl(AdminSettings));

export default withXFlowProvider(
  AdminSettingsBase,
  ({
    xFlow: {
      optOut: {
        optOutHeading,
        optOutMessage,
        optOutMessageWarning,
        optOutNotePlaceholder,
      },
      status,
      optOutRequestTrialFeature,
      cancelOptOut,
    },
  }) => ({
    optOutRequestTrialFeature,
    cancelOptOut,
    status,
    heading: optOutHeading,
    message: optOutMessage,
    messageWarning: optOutMessageWarning,
    notePlaceholder: optOutNotePlaceholder,
  })
);
