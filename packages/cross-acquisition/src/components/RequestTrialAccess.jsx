import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { RequestTrialHeader } from '../styled/RequestTrial';

export default class RequestTrialAccess extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    heading: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,

    onRequestAccessClick: PropTypes.func,
    onCancelClick: PropTypes.func,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    onRequestAccessClick: () => {},
    onCancelClick: () => {},
  }

  state = {
    isOpen: true,
  }

  handleCancelClick = () => {
    this.props.onCancelClick();
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        header={this.props.productLogo}
        footer={
          <p>
            <Button appearance="primary" onClick={this.props.onRequestAccessClick}>Request access</Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>Cancel</Button>
          </p>
        }
      >
        <div>
          <RequestTrialHeader>{this.props.heading}</RequestTrialHeader>
          <p>{this.props.message}</p>
        </div>
      </ModalDialog>
    );
  }
}
