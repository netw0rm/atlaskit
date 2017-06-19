import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import { AtlassianLogo } from '@atlaskit/logo';
import styled from 'styled-components';

const StartTrialFooter = styled.div`
  margin-bottom: 8px;
  margin-right: 8px;
  text-align: right;
`;

export default class StartTrial extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    children: PropTypes.node,
  }

  static defaultProps = {
    productLogo: <AtlassianLogo />,
  }

  state = {
    isOpen: true,
  }

  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  handleCancelClick = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <ModalDialog
        isOpen={this.state.isOpen}
        width="small"
        header={this.props.productLogo}
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleButtonClick} appearance="primary">Confirm</Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link" >Cancel</Button>
          </StartTrialFooter>
        }
      >
        {this.props.children}
      </ModalDialog>
    );
  }
}
