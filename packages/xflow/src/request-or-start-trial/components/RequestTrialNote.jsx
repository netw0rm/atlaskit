import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import ErrorFlag from './ErrorFlag';
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
});

class RequestTrialNote extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    onComplete: PropTypes.func.isRequired,
    prompt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    requestTrialAccessWithNote: PropTypes.func,
    requestTrialAccessWithoutNote: PropTypes.func,
  };

  static defaultProps = {
    onRequestAccessClick: () => {},
    requestTrialAccessWithNote: () => Promise.resolve(),
    requestTrialAccessWithoutNote: () => Promise.resolve(),
  };

  state = {
    requestTrialSendNoteFailed: false,
  }

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.displayed');
  }

  handleSendRequest = () => {
    const {
      firePrivateAnalyticsEvent,
      requestTrialAccessWithNote,
      requestTrialAccessWithoutNote,
      onComplete,
    } = this.props;
    this.setState({
      requestTrialSendNoteFailed: false,
    });
    const noteText = document.getElementById('request-trial-note').value;
    if (noteText === '') {
      firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked.with.no.text');
      requestTrialAccessWithoutNote()
        .then(() => onComplete());
    } else {
      firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked');
      requestTrialAccessWithNote()
        .then(() => {
          firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.successful');
          onComplete();
        })
        .catch(() => {
          firePrivateAnalyticsEvent('xflow.request-trial-note.send-note.failed');
          this.setState({
            requestTrialSendNoteFailed: true,
          });
        });
    }
  };

  handleSendRequestWithoutNote = () => {
    const { firePrivateAnalyticsEvent, requestTrialAccessWithoutNote, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.send-without-note-button.clicked');
    return Promise.resolve(requestTrialAccessWithoutNote()).then(() => onComplete());
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent(
      'xflow.request-trial-note.error-flag.dismissed');
    this.setState({
      requestTrialSendNoteFailed: false,
    });
  };

  render() {
    const {
      intl,
      placeholder,
      prompt,
    } = this.props;
    return (
      <ModalDialog
        isOpen
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
            <Button appearance="primary" onClick={this.handleSendRequest}>
              <FormattedMessage
                id="xflow.generic.request-trial-note.request-button"
                defaultMessage="Send request"
              />
            </Button>
            <Button appearance="subtle-link" onClick={this.handleSendRequestWithoutNote}>
              <FormattedMessage
                id="xflow.generic.request-trial-note.request-without-note-button"
                defaultMessage="Send without note"
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
          <NoteText id="request-trial-note" placeholder={placeholder} />
        </div>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.requestTrialSendNoteFailed}
          flagActions={[
            { content: 'Resend request',
              // TODO: Work out how to resend the request and dismiss the flag
              onClick: this.handleErrorFlagDismiss,
            },
            { content: 'Not now', onClick: this.handleErrorFlagDismiss },
          ]}
        />
      </ModalDialog>
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
      requestTrialAccessWithoutNote,
    },
  }) => ({
    productLogo,
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    requestTrialAccessWithNote,
    requestTrialAccessWithoutNote,
  })
);
