import React, { Component } from 'react';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import { ConfluenceLogo } from '@atlaskit/logo';
import styled from 'styled-components';

export const MegatronStartTrialFooter = styled.div`
  text-align: right;
  margin-bottom: 8px;
  margin-right: 8px;
`;

export const MegatronStartTrialDialog = styled.div`
  margin-left: 8px;
`;

export const MegatronStartTrialHeader = styled.span`
  margin-top: 0px;
`;

export default class StartTrial extends Component {

  handleButtonClick = (buttonType) => {
    console.log(`The ${buttonType} button got clicked!`);
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
          <MegatronStartTrialFooter>
            <Button onClick={() => this.handleButtonClick('confirm')} appearance="primary">Confirm</Button><Button onClick={() => this.handleButtonClick('cancel')} appearance="subtle-link" >Cancel</Button>
          </MegatronStartTrialFooter>
        }
      >
        <MegatronStartTrialDialog>
          <MegatronStartTrialHeader><h3>Start your 30 day trial</h3></MegatronStartTrialHeader>
          <p>Once your trial finishes, billing will start.
            <br />
            Easily cancel at anytime in <b>Manage Application</b>.
            <br />
            We will email your billing contact 3 days in advance.</p>
        </MegatronStartTrialDialog>
      </ModalDialog>
    );
  }
}
