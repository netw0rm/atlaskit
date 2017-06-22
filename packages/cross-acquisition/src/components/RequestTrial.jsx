import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { RequestTrialHeader, NoteText } from '../styled/RequestTrial';

export default class RequestTrial extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
    onRequestAccessClick: PropTypes.func,
    onSendRequestClick: PropTypes.func,
    onSendWithoutNoteClick: PropTypes.func,
    onCancelClick: PropTypes.func,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    onRequestAccessClick: () => {},
    onSendRequestClick: () => {},
    onSendWithoutNoteClick: () => {},
    onCancelClick: () => {},
  }

  state = {
    isOpen: true,
    step: 0,
  }

  handleCancelClick = () => {
    this.props.onCancelClick();
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const dialogContents = [
      {
        header: this.props.productLogo,
        footer: (
          <p>
            <Button appearance="primary" onClick={this.props.onRequestAccessClick}>Request access</Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>Cancel</Button>
          </p>
        ),
        body: (
          <div>
            <RequestTrialHeader>{this.props.header}</RequestTrialHeader>
            {this.props.children}
          </div>
        ),
      },
      {
        header: <RequestTrialHeader>Add a note</RequestTrialHeader>,
        footer: (
          <p>
            <Button appearance="primary" onClick={this.props.onSendRequestClick}>Send request</Button>
            <Button appearance="subtle-link" onClick={this.props.onSendWithoutNoteClick}>Send without note</Button>
          </p>
        ),
        body: (
          <div>
            <p>Help your site administrator understand why you would like to use Confluence:</p>
            <NoteText placeholder="I would like to try Confluence because…" />
          </div>
        ),
      },
    ];

    return (
      <div>
        <ModalDialog
          isOpen={this.state.isOpen}
          header={dialogContents[this.state.step].header}
          footer={dialogContents[this.state.step].footer}
        >
          {dialogContents[this.state.step].body}
        </ModalDialog>
      </div>
    );
  }
}
