import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { withAnalytics } from '@atlaskit/analytics';

import ErrorFlag from '../../common/components/ErrorFlag';
import SuccessFlag from '../../common/components/SuccessFlag';

import OptOutHeader from '../styled/OptOutHeader';
import OptOutFooter from '../styled/OptOutFooter';
import CustomLabel from '../styled/CustomLabel';
import SpinnerDiv from '../../common/styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.opt-out.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.request-tral-note.error-flag.description',
    defaultMessage: "That request didn't make it through. Shall we try again?",
  },
  successFlagTitle: {
    id: 'xflow.generic.opt-out.success-flag.title',
    defaultMessage: 'Your request is sent',
  },
  successFlagDescription: {
    id: 'xflow.generic.request-tral-note.success-flag.description',
    defaultMessage: 'Props for helping your admin out!',
  },
});

class AdminSettings extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    defaultSelectedRadio: PropTypes.string.isRequired,
    optionItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        note: PropTypes.string,
      })
    ).isRequired,
    children: PropTypes.node,
    spinnerActive: PropTypes.bool,
    buttonsDisabled: PropTypes.bool,
    firePrivateAnalyticsEvent: PropTypes.func,
    intl: intlShape.isRequired,
    optOutRequestTrialFeature: PropTypes.func,
    cancelOptOut: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
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
    requestTrialSendNoteStatus: null,
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

  handleContinueClick = async () => {
    const { firePrivateAnalyticsEvent } = this.props;
    const { selectedRadio } = this.state;
    firePrivateAnalyticsEvent('xflow.opt-out.continue-button.clicked', {
      selectedRadio,
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

  handleRadioChange = evt => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.opt-out.radio-option.changed', {
      selectedRadio: evt.target.value,
    });
    this.setState({
      selectedRadio: evt.target.value,
    });
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
    const { intl, heading, message, optionItems } = this.props;
    const { optOutRequestStatus } = this.state;

    return (
      <div>
        <ModalDialog
          isOpen={this.state.isOpen}
          width="small"
          header={<OptOutHeader>{heading}</OptOutHeader>}
          footer={
            <OptOutFooter>
              <SpinnerDiv>
                <Spinner isCompleting={!this.state.spinnerActive} />
              </SpinnerDiv>
              <Button
                id="xflow-opt-out-continue-button"
                onClick={this.handleContinueClick}
                appearance="primary"
                isDisabled={this.state.buttonsDisabled}
              >
                <FormattedMessage
                  id="xflow-generic.opt-out.continue-button"
                  defaultMessage="Continue"
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
          <AkFieldRadioGroup
            label={message}
            onRadioChange={this.handleRadioChange}
            items={optionItems.map(({ value, label, note }) => ({
              value,
              label: note ? (
                <CustomLabel>
                  {label}
                  <br />
                  <small>{note}</small>
                </CustomLabel>
              ) : (
                label
              ),
              isSelected: this.state.selectedRadio === value,
            }))}
          />
          {this.props.children}
        </ModalDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={optOutRequestStatus === 'failed'}
          flagActions={[
            {
              content: 'Resend request',
              onClick: this.handleErrorFlagResendRequest,
            },
            { content: 'Not now', onClick: this.handleErrorFlagDismiss },
          ]}
        />
        <SuccessFlag
          title={intl.formatMessage(messages.successFlagTitle)}
          description={intl.formatMessage(messages.successFlagDescription)}
          showFlag={optOutRequestStatus === 'successful'}
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
      config: {
        productLogo,
        optOut: { optOutHeading, optOutMessage, optOutOptionItems, optOutDefaultSelectedRadio },
      },
      status,
      optOutRequestTrialFeature,
      cancelOptOut,
    },
  }) => ({
    productLogo,
    optOutRequestTrialFeature,
    cancelOptOut,
    status,
    heading: optOutHeading,
    message: optOutMessage,
    optionItems: optOutOptionItems,
    defaultSelectedRadio: optOutDefaultSelectedRadio,
  })
);
