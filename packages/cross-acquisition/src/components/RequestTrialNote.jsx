import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { RequestTrialHeader, NoteText } from '../styled/RequestTrial';

export default class RequestTrialNote extends Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,

    onSendRequestClick: PropTypes.func,
    onSendWithoutNoteClick: PropTypes.func,
  }

  static defaultProps = {
    onRequestAccessClick: () => {},
    onSendRequestClick: () => {},
    onSendWithoutNoteClick: () => {},
    onCancelClick: () => {},
  }

  state = {
    isOpen: true,
  }

  // Help your site administrator understand why you would like to use Confluence:
  // I would like to try Confluence because…

  render() {
    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        header={<RequestTrialHeader>Add a note</RequestTrialHeader>}
        footer={
          <p>
            <Button appearance="primary" onClick={this.props.onSendRequestClick}>Send request</Button>
            <Button appearance="subtle-link" onClick={this.props.onSendWithoutNoteClick}>Send without note</Button>
          </p>
        }
      >
        <div>
          {React.isValidElement(this.props.prompt)
            ? this.props.prompt
            : <p>{this.props.prompt}</p>
          }
          <NoteText placeholder={this.props.placeholder} />
        </div>
      </ModalDialog>
    );
  }
}
