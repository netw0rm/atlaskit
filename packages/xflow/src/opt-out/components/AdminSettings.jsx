import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import OptOutHeader from '../styled/OptOutHeader';
import OptOutFooter from '../styled/OptOutFooter';

export default class AdminSettings extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    header: 'Confluence trial requests',
  };

  state = {
    isOpen: true,
  };

  handleCancelClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleButtonClick = () => {
    // console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  };

  render() {
    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        width="small"
        header={
          <OptOutHeader>
            {this.props.header}
          </OptOutHeader>
        }
        footer={
          <OptOutFooter>
            <Button onClick={this.handleButtonClick} appearance="primary">
              Continue
            </Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">
              Cancel
            </Button>
          </OptOutFooter>
        }
      >
        {this.props.children}
      </ModalDialog>
    );
  }
}
