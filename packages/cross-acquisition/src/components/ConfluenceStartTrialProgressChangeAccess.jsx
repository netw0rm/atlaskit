import React, { Component } from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';
import MentionPicker, { MentionResource } from '@atlaskit/mention';
import DropdownMenu from '@atlaskit/dropdown-menu';
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

  handleSelection = (mention) => {
    console.log(mention); // TODO: do something with the selected user
  }

  render() {
    const mentionProvider = new MentionResource({
      url: 'http://example-mention-server/service', // TODO: determine end point to hit
    });
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
              label: ['Specific users',
                <div id="MentionsTarget">
                  <br />
                  <DropdownMenu
                    triggerType="button"
                  >
                    Start typing a username
                  </DropdownMenu>
                </div>],
            }]}
            label="Choose an option"
          />
          <MentionPicker
            resourceProvider={mentionProvider}
            query="test"
            onSelection={this.handleSelection}
            target="MentionsTarget"
            position="below"
          />
          <p>How will this affect my bill?
            <Button onClick={this.handleButtonClick} appearance="link">Learn more</Button>
          </p>
          <StartTrialProgressDiv>
            <input type="checkbox" id="notifyUsers" name="notify" value="Notify the users" checked />
            <InputLabel htmlFor="notifyUsers">Notify these users</InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </StartTrialProgress>
    );
  }
}
