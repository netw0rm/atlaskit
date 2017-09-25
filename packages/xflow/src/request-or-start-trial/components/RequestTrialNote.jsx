import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import ErrorFlag from '../../common/components/ErrorFlag';
import SuccessFlag from '../../common/components/SuccessFlag';
import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestTrialFooter from '../styled/RequestTrialFooter';
import NoteText from '../styled/NoteText';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.request-trial-note.error-flag.title',
    defaultMessage: 'Uh oh. something\'s up',
  },
  errorFlagDescription: {
    id: 'xflow.generic.request-tral-note.error-flag.description',
    defaultMessage: "That request didn't make it through. Shall we try again?",
  },
  errorFlagResendRequest: {
    id: 'xflow.generic.request-trial-note.error-flag.resend-request',
    defaultMessage: 'Resend request',
  },
  errorFlagNotNow: {
    id: 'xflow.generic.request-trial-note.error-flag.not-now',
    defaultMessage: 'Not now',
  },
  successFlagTitle: {
    id: 'xflow.generic.request-trial-note.success-flag.title',
    defaultMessage: 'That\'s sent!',
  },
  successFlagDescription: {
    id: 'xflow.generic.request-tral-note.success-flag.description',
    defaultMessage: 'We\'ll let your admin know why you\'re keen to try Confluence.',
  },
});

class RequestTrialNote extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    onComplete: PropTypes.func.isRequired,
    prompt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    placeholderShort: PropTypes.string,
    requestTrialWithNote: PropTypes.func,
    setProductRequestFlag: PropTypes.func,
  };

  static defaultProps = {
    onRequestTrialClick: () => {},
    requestTrialWithNote: () => Promise.resolve(),
  };

  state = {
    requestTrialSendNoteStatus: null,
    awaitingRequest: false,
    noteText: this.props.placeholder,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.displayed');
  }

  handleSendingNote = () => {
    const {
      firePrivateAnalyticsEvent,
      requestTrialWithNote,
      setProductRequestFlag,
    } = this.props;
    requestTrialWithNote(this.state.noteText)
    .then(() => {
      firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.successful');
      this.setState({
        requestTrialSendNoteStatus: 'successful',
      });
      setProductRequestFlag()
        .then(() => {
          firePrivateAnalyticsEvent('xflow.request-trial-note.set-requested-flag.successful');
        })
        .catch(e => {
          firePrivateAnalyticsEvent('xflow.request-trial-note.set-requested-flag.failed', {
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

  handleSendRequest = withNote => () => {
    const {
      firePrivateAnalyticsEvent,
      placeholderShort,
    } = this.props;
    this.setState({
      requestTrialSendNoteStatus: null,
      awaitingRequest: true,
    });
    if (withNote) {
      firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked');
      const noteTextValue = this.noteText.value;
      const noteLength = this.noteText.value.length;
      if (noteTextValue) {
        firePrivateAnalyticsEvent('xflow.request-trial-note.custom-note.included', {
          noteLength,
        });
        this.setState({ noteText: noteTextValue });
      }
    } else {
      firePrivateAnalyticsEvent('xflow.request-trial-note.skip-button.clicked');
      this.setState({ noteText: placeholderShort });
    }
    this.handleSendingNote();
  }

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.error-flag.dismissed');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  handleErrorFlagResendRequest = () => {
    const {
      firePrivateAnalyticsEvent,
    } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.error-flag.resend-request');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    this.handleSendingNote();
  };

  handleSuccessFlagDismiss = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.success-flag.dismissed');
    this.setState({
      requestTrialSendNoteStatus: null,
    });
    setTimeout(onComplete, 1000);
  };

  render() {
    const { intl, placeholder, prompt } = this.props;
    const { awaitingRequest, requestTrialSendNoteStatus } = this.state;
    return (
      <div id="xflow-request-trial-note">
        <ModalDialog
          isOpen={!awaitingRequest}
          width="small"
          header={
            <RequestTrialHeader>
              <FormattedMessage
                id="xflow.generic.request-trial-note.heading"
                defaultMessage="Message your site admin"
              />
            </RequestTrialHeader>
          }
          footer={
            <RequestTrialFooter>
              <Button appearance="primary" onClick={this.handleSendRequest(true)}>
                <FormattedMessage
                  id="xflow.generic.request-trial-note.request-button"
                  defaultMessage="Send note"
                />
              </Button>
              <Button appearance="subtle-link" onClick={this.handleSendRequest(false)}>
                <FormattedMessage
                  id="xflow.generic.request-trial-note.skip-button"
                  defaultMessage="Skip"
                />
              </Button>
            </RequestTrialFooter>
          }
        >
          <div>
            {React.isValidElement(prompt) ? prompt : <p>{prompt}</p>}
            <NoteText
              innerRef={noteText => {
                this.noteText = noteText;
              }}
              placeholder={placeholder}
              maxLength={300}
            />
          </div>
        </ModalDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={requestTrialSendNoteStatus === 'failed'}
          flagActions={[
            {
              content: intl.formatMessage(messages.errorFlagResendRequest),
              onClick: this.handleErrorFlagResendRequest,
            },
            { content: intl.formatMessage(messages.errorFlagNotNow),
              onClick: this.handleErrorFlagDismiss },
          ]}
        />
        <SuccessFlag
          title={intl.formatMessage(messages.successFlagTitle)}
          description={intl.formatMessage(messages.successFlagDescription)}
          showFlag={requestTrialSendNoteStatus === 'successful'}
          source="request-trial-note"
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
      requestTrialWithNote,
      setProductRequestFlag,
    },
  }) => ({
    productLogo,
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    placeholderShort: requestTrial.notePlaceholderShort,
    requestTrialWithNote,
    setProductRequestFlag,
  })
);
