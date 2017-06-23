import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import Button from '@atlaskit/button';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import StartTrialProgress from './StartTrialProgress';
import {
  StartTrialDialog,
  StartTrialHeader,
  StartTrialProgressDiv,
  InputLabel,
} from '../styled/StartTrial';

// TODO: Determine whether to use composition of inheritance.
export default class ConfluenceStartTrialProgress extends Component {
  handleButtonClick = (evt) => {
    console.log(`The ${`${evt.target.textContent}`.toLowerCase()} button got clicked!`);
  }

  handleRadioChange = (evt) => {
    console.log(`The ${`${evt.target.value}`} radio got selected!`);
  }

  render() {
    return (
      <StartTrialProgress productLogo={<ConfluenceLogo />}>
        <StartTrialDialog>
          <StartTrialHeader>Who should have access?</StartTrialHeader>
          <FieldRadioGroup
            onRadioChange={this.handleRadioChange}
            items={[{
              name: 'access-option',
              value: 'everyone',
              key: 'everyone',
              label: 'Everyone in JIRA Software',
            },
            {
              name: 'access-option',
              value: 'siteAdmins',
              key: 'siteAdmins',
              label: 'Site admins only',
            },
            {
              name: 'access-option',
              value: 'specificUsers',
              key: 'specificUsers',
              label: ['Specific users', <p>Start typing a username</p>],
            }]}
            label="Choose an option"
          />
          <p>How will this affect my bill?
            <Button onClick={this.handleButtonClick} appearance="link">Learn more</Button>
          </p>
          <StartTrialProgressDiv>
            <input type="checkbox" id="notifyUsers" name="notify" value="Notify the users" />
            <InputLabel htmlFor="notifyUsers">Notify these users</InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </StartTrialProgress>
    );
  }
}
