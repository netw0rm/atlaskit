import React, { Component } from 'react';
import Button from '@atlaskit/button';
import { ConfluenceLogo } from '@atlaskit/logo';
import StartTrialProgress from './StartTrialProgress';
import {
  StartTrialDialog,
  StartTrialHeader,
  StartTrialProgressDiv,
  InputLabel,
  ChangeButton,
} from '../styled/StartTrial';

// TODO: Determine whether to use composition of inheritance.
export default class ConfluenceStartTrialProgress extends Component {
  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  render() {
    return (
      <StartTrialProgress productLogo={<ConfluenceLogo />}>
        <StartTrialDialog>
          <StartTrialHeader>Who should have access?</StartTrialHeader>
          <p><b>Everyone in JIRA Software</b> will have
          <ChangeButton>
            <Button onClick={this.handleButtonClick} appearance="link">Change...</Button>
          </ChangeButton>
            access to Confluence.</p>
          <StartTrialProgressDiv>
            <input type="checkbox" id="notifyUsers" name="notify" value="Notify the users" defaultChecked />
            <InputLabel htmlFor="notifyUsers">Notify these users</InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </StartTrialProgress>
    );
  }
}
