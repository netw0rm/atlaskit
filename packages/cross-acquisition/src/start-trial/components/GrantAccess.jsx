import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Select from '@atlaskit/multi-select';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import { crossSellShape } from '../../common/components/CrossSellProvider';

import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import InputLabel from '../styled/InputLabel';
import UserSelectDiv from '../styled/UserSelectDiv';
import ProgressBar from '../styled/ProgressBar';
import AffectMyBillText from '../styled/AffectMyBillText';

export default class GrantAccess extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  static contextTypes = crossSellShape;

  state = {
    userSelectInFocus: false,
    selectedRadio: 'everyone',
  }

  // TODO: make multi-select invalid if specific users chosen with none picked
  // isInvalid={this.state.isInvalid} | this.setState({ isInvalid: true });

  handleContinueClick = () => {
    this.props.onComplete();
  }

  handleLearnMoreClick = () => {
    console.log('Learn more clicked');
  }

  handleRadioChange = (evt) => {
    console.log(`The ${`${evt.target.value}`} radio got selected!`);
    this.setState({ selectedRadio: evt.target.value, userSelectInFocus: false });
    if (evt.target.value === 'specificUsers') {
      this.setState({ userSelectInFocus: true });
    }
  }

  handleUserSelectOpen = (evt) => {
    if (evt.isOpen) {
      this.setState({ selectedRadio: 'specificUsers' });
    }
  }

  createUserItem = (key, presence, disabled = false) => ({
    content: `Anonymous User ${key}`,
    elemBefore: <Avatar size="small" presence={presence} />,
    isDisabled: disabled,
    value: `user_${key}`,
    description: `@user_${key}`,
    tag: {
      elemBefore: <Avatar size="xsmall" />,
      appearance: 'rounded',
    },
  })

  render() {
    const selectItems = [
      {
        items: [
          this.createUserItem(1, 'online'),
          this.createUserItem(2, 'online'),
          this.createUserItem(3, 'busy', true),
          this.createUserItem(4, 'offline'),
          this.createUserItem(5, 'busy'),
        ],
      },
    ];

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <div>
            {this.context.crossSell.productLogo}
            <ProgressBar>- P R O G R E S S B A R -</ProgressBar>
          </div>
        }
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleContinueClick} appearance="primary">Continue</Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>Who should have access?</StartTrialHeader>
          <AkFieldRadioGroup
            ref={(radioGroup) => { this.radioGroup = radioGroup; }}
            onRadioChange={this.handleRadioChange}
            items={[{
              name: 'access-option',
              value: 'everyone',
              key: 'everyone',
              label: 'Everyone in JIRA Software',
              isSelected: this.state.selectedRadio === 'everyone',
            },
            {
              name: 'access-option',
              value: 'siteAdmins',
              key: 'siteAdmins',
              label: 'Site admins only',
              isSelected: this.state.selectedRadio === 'siteAdmins',
            },
            {
              name: 'access-option',
              value: 'specificUsers',
              key: 'specificUsers',
              label: ['Specific users'],
              isSelected: this.state.selectedRadio === 'specificUsers',
            }]}
            label="Choose an option"
          />
          <UserSelectDiv>
            <Select
              ref={(userSelect) => { this.userSelect = userSelect; }}
              id="userSelect"
              items={selectItems}
              placeholder="Start typing a username"
              name="test"
              onSelectedChange={item => console.log(item)}
              onOpenChange={this.handleUserSelectOpen}
              shouldFitContainer
              shouldFocus={this.state.userSelectInFocus}
            />
          </UserSelectDiv>
          <AffectMyBillText>How will this affect my bill?
            <Button onClick={this.handleLearnMoreClick} appearance="link">Learn more</Button>
          </AffectMyBillText>
          <StartTrialProgressDiv>
            <input type="checkbox" id="notifyUsers" name="notify" value="Notify the users" defaultChecked />
            <InputLabel htmlFor="notifyUsers">Notify these users</InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}
