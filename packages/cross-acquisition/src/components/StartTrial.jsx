import React, { Component } from 'react';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import { ConfluenceLogo } from '@atlaskit/logo';

const css = `
  .megatron-start-trial-footer {
    text-align: right;
    margin-bottom: 8px;
    margin-right: 8px;
  }
  .megatron-start-trial-dialog {
    margin-left: 8px;
  }
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
          <div className="megatron-start-trial-footer">
            <Button onClick={() => this.handleButtonClick('confirm')} appearance="primary">Confirm</Button><Button onClick={() => this.handleButtonClick('cancel')} appearance="subtle-link" >Cancel</Button>
          </div>
        }
      >
        <div className="megatron-start-trial-dialog">
          <style>{css}</style>
          <h3 style={{ marginTop: 0 }}>Start your 30 day trial</h3>
          <p>Once your trial finishes, billing will start.
            <br />
            Easily cancel at anytime in <b>Manage Application</b>.
            <br />
            We will email your billing contact 3 days in advance.</p>
        </div>
      </ModalDialog>
    );
  }
}
