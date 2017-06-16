import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import styled from 'styled-components';

const OptOutFooter = styled.div`
  margin-bottom: 8px;
  margin-right: 8px;
  text-align: right;
`;

const OptOutHeader = styled.h3`
  padding: 8px 0px 0px 8px;
`;

export default class OptOut extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    header: 'Request settings',
  }

  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <OptOutHeader>{this.props.header}</OptOutHeader>
        }
        footer={
          <OptOutFooter>
            <Button onClick={this.handleButtonClick} appearance="primary">Continue</Button>
            <Button onClick={this.handleButtonClick} appearance="subtle-link" >Cancel</Button>
          </OptOutFooter>
        }
      >
        {this.props.children}
      </ModalDialog>
    );
  }
}

