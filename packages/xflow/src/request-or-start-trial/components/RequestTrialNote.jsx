import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import NoteText from '../styled/NoteText';

export class RequestTrialNoteBase extends Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    requestTrialAccessWithNote: PropTypes.func,
    requestTrialAccessWithoutNote: PropTypes.func,
  };

  static defaultProps = {
    onRequestAccessClick: () => {},
    requestTrialAccessWithNote: () => Promise.resolve(),
    requestTrialAccessWithoutNote: () => Promise.resolve(),
  };

  handleSendRequest = () => {
    const { requestTrialAccessWithNote, onComplete } = this.props;
    return Promise.resolve(requestTrialAccessWithNote()).then(() => onComplete());
  };

  handleSendRequestWithoutNote = () => {
    const { requestTrialAccessWithoutNote, onComplete } = this.props;
    return Promise.resolve(requestTrialAccessWithoutNote()).then(() => onComplete());
  };

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={<RequestTrialHeader>Ping your site admin</RequestTrialHeader>}
        footer={
          <RequestAccessFooter>
            <Button appearance="primary" onClick={this.handleSendRequest}>
              Send request
            </Button>
            <Button appearance="subtle-link" onClick={this.handleSendRequestWithoutNote}>
              Send without note
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
          <NoteText placeholder={this.props.placeholder} />
        </div>
      </ModalDialog>
    );
  }
}

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
