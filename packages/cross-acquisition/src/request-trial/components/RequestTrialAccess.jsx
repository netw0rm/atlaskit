import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';

import RequestTrialHeader from '../styled/RequestTrialHeader';

export default class RequestTrialAccess extends Component {
  static propTypes = {
    banner: PropTypes.string.isRequired,
    productLogo: PropTypes.element,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,

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
        header={
          <div>
            <img src={this.props.banner} alt="" />
            <span><LockFilledIcon
              label=""
              size="small"
            /> Inactive on your site</span>
          </div>
        }
        footer={
          <p>
            <Button appearance="primary" onClick={this.props.onRequestAccessClick}>Request access</Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>Cancel</Button>
          </p>
        }
      >
        <div>
          {this.props.productLogo}
          <RequestTrialHeader>{this.props.heading}</RequestTrialHeader>
          {React.isValidElement(this.props.message)
            ? this.props.message
            : <p>{this.props.message}</p>
          }
        </div>
      </ModalDialog>
    );
  }
}
