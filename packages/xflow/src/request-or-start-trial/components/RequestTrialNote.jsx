import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import NoteText from '../styled/NoteText';

class RequestTrialNote extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
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
    const noteText = document.getElementById('request-trial-note').value;
    if (noteText === '') {
      firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked.with.no.text');
      return Promise.resolve(requestTrialAccessWithoutNote()).then(() => onComplete());
    }
    firePrivateAnalyticsEvent('xflow.request-trial-note.send-button.clicked');
    return Promise.resolve(requestTrialAccessWithNote()).then(() => onComplete());
    // TODO: add analytics events for success or failure of sending note
  };

  handleSendRequestWithoutNote = () => {
    const { firePrivateAnalyticsEvent, requestTrialAccessWithoutNote, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial-note.send-without-note-button.clicked');
    return Promise.resolve(requestTrialAccessWithoutNote()).then(() => onComplete());
  };

  render() {
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
          {React.isValidElement(this.props.prompt)
            ? this.props.prompt
            : <p>
              {this.props.prompt}
            </p>}
          <NoteText id="request-trial-note" placeholder={this.props.placeholder} />
        </div>
      </ModalDialog>
    );
  }
}

export const RequestTrialNoteBase = withAnalytics(RequestTrialNote);

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
