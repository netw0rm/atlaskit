import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import ErrorFlag from './ErrorFlag';
import SuccessFlag from './SuccessFlag';
import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import NoteText from '../styled/NoteText';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.request-trial-note.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.request-tral-note.error-flag.description',
    defaultMessage: "That request didn't make it through. Shall we try again?",
  },
  successFlagTitle: {
    id: 'xflow.generic.request-trial-note.success-flag.title',
    defaultMessage: 'Your request is sent',
  },
  successFlagDescription: {
    id: 'xflow.generic.request-tral-note.success-flag.description',
    defaultMessage: 'Props for helping your admin out!',
  },
});

class RequestTrialNote extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    onComplete: PropTypes.func.isRequired,
    prompt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    requestTrialAccessWithNote: PropTypes.func,
    setProductRequestFlag: PropTypes.func,
  };

  static defaultProps = {
    onRequestAccessClick: () => {},
    requestTrialAccessWithNote: () => Promise.resolve(),
  };

  state = {
    requestTrialSendNoteStatus: null,
    awaitingRequest: false,
    noteText: this.props.placeholder,
  }

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.displayed');
  }

  handleSendRequest = () => {
    const {
      firePrivateAnalyticsEvent,
      requestTrialAccessWithNote,
      setProductRequestFlag,
    } = this.props;
    const noteTextValue = this.noteText.value;
    this.setState({
      requestTrialSendNoteStatus: null,
      awaitingRequest: true,
    });
    if (noteTextValue) {
      this.setState({ noteText: noteTextValue });
    }
    firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked');
    requestTrialAccessWithNote(this.state.noteText)
      .then(() => {
        firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.successful');
        this.setState({
          requestTrialSendNoteStatus: 'successful',
        });
        setProductRequestFlag()
          .catch(e => {
            firePrivateAnalyticsEvent('xflow.request-trial-note.set-request-flag.failed', {
              errorMessage: e.message,
            });
          });
      })
      .catch(e => {
        firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.failed', {
          errorMessage: e.message,
        });
        this.setState({
          requestTrialSendNoteStatus: 'failed',
        });
      });
  }

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent(
      'xflow.request-trial-note.error-flag.dismissed');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  handleErrorFlagResendRequest = () => {
    const {
      firePrivateAnalyticsEvent,
      requestTrialAccessWithNote,
      setProductRequestFlag,
    } = this.props;
    firePrivateAnalyticsEvent(
      'xflow.request-trial-note.error-flag.resend-request');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    requestTrialAccessWithNote(this.state.noteText)
      .then(() => {
        firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.successful');
        this.setState({
          requestTrialSendNoteStatus: 'successful',
        });
        setProductRequestFlag()
          .catch(e => {
            firePrivateAnalyticsEvent('xflow.request-trial-note.set-request-flag.failed', {
              errorMessage: e.message,
            });
          });
      })
      .catch(e => {
        firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.failed', {
          errorMessage: e.message,
        });
        this.setState({
          requestTrialSendNoteStatus: 'failed',
        });
      });
  };

  handleSuccessFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent(
      'xflow.request-trial-note.success-flag.dismissed');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  render() {
    const {
      intl,
      placeholder,
      prompt,
    } = this.props;
    const {
      awaitingRequest,
      requestTrialSendNoteStatus,
    } = this.state;
    return (
      <div>
        <ModalDialog
          isOpen={!awaitingRequest}
          width="small"
          header={
            <RequestTrialHeader>
              <FormattedMessage
                id="xflow.generic.request-trial-note.heading"
                defaultMessage="Ping your site admin"
              />
            </RequestTrialHeader>}
          footer={
            <RequestAccessFooter>
              <Button
                appearance="primary"
                onClick={this.handleSendRequest}
              >
                <FormattedMessage
                  id="xflow.generic.request-trial-note.request-button"
                  defaultMessage="Send request"
                />
              </Button>
            </RequestAccessFooter>
        }
        >
          <div>
            {React.isValidElement(prompt)
            ? prompt
            : <p>
              {prompt}
            </p>}
            <NoteText
              ref={noteText => { this.noteText = noteText; }}
              placeholder={placeholder}
            />
          </div>
        </ModalDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={requestTrialSendNoteStatus === 'failed'}
          flagActions={[
            { content: 'Resend request',
              onClick: this.handleErrorFlagResendRequest,
            },
        { content: 'Not now', onClick: this.handleErrorFlagDismiss },
          ]}
        />
        <SuccessFlag
          title={intl.formatMessage(messages.successFlagTitle)}
          description={intl.formatMessage(messages.successFlagDescription)}
          showFlag={requestTrialSendNoteStatus === 'successful'}
          onDismissed={this.handleSuccessFlagDismiss}
        />
      </div>
    );
  }
}

export const RequestTrialNoteBase = withAnalytics(injectIntl(RequestTrialNote));

export default withXFlowProvider(
  RequestTrialNoteBase,
  ({
    xFlow: {
      config: { productLogo, requestTrial },
      requestTrialAccessWithNote,
      setProductRequestFlag,
    },
  }) => ({
    productLogo,
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    requestTrialAccessWithNote,
    setProductRequestFlag,
  })
);
