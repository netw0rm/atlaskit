import React, { Component } from 'react';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import { ConfluenceLogo } from '@atlaskit/logo';
import styled from 'styled-components';

export const StartTrialFooter = styled.div`
  margin-bottom: 8px;
  margin-right: 8px;
  text-align: right;
`;

export const StartTrialDialog = styled.div`
  margin-left: 8px;
`;

export const StartTrialHeader = styled.h3`
  margin-top: 0px;
`;

export default class StartTrial extends Component {
  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  render() {
    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <span><ConfluenceLogo /></span>
        }
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleButtonClick} appearance="primary">Confirm</Button><Button onClick={this.handleButtonClick} appearance="subtle-link" >Cancel</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>Start your 30 day trial</StartTrialHeader>
          <p>Once your trial finishes, billing will start.
            <br />
            Easily cancel at anytime in <b>Manage Application</b>.
            <br />
            We will email your billing contact 3 days in advance.</p>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}
