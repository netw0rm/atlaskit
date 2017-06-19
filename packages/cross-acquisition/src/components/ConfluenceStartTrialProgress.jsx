import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { ConfluenceLogo } from '@atlaskit/logo';
import StartTrialProgress from './StartTrialProgress';

const StartTrialDialog = styled.div`
  margin-left: 8px;
`;

const StartTrialHeader = styled.h3`
  margin-top: 0px;
`;

const StartTrialProgressDiv = styled.div`
  margin-top: 12px;
`;

const InputLabel = styled.label`
  margin-left: 4px;
`;

const ChangeButton = styled.span`
  margin-left: 16px;
`;

// TODO: Determine whether to use composition of inheritance.
export default class ConfluenceStartTrialProgress extends Component {
  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  render() {
    return (
      <StartTrialProgress productLogo={<ConfluenceLogo />}>
        <StartTrialDialog>

          <StartTrialHeader>Who has access</StartTrialHeader>
          <p><b>All your active users</b> will have access
          <ChangeButton>
            <Button onClick={this.handleButtonClick} appearance="link">Change...</Button>
          </ChangeButton>
            to Confluence</p>
          <StartTrialProgressDiv>
            <input type="checkbox" id="notifyUsers" name="notify" value="Notify the users" />
            <InputLabel htmlFor="notifyUsers">Notfiy the users</InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </StartTrialProgress>
    );
  }
}
