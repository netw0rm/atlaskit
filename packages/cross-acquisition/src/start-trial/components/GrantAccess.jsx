import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Select from '@atlaskit/multi-select';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import { withCrossSellProvider, crossSellShape } from '../../';

import ProgressBar from './ProgressBar';

import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import InputLabel from '../styled/InputLabel';
import UserSelectDiv from '../styled/UserSelectDiv';
import AffectMyBillText from '../styled/AffectMyBillText';
import ChangeButton from '../styled/ChangeButton';

export class GrantAccessBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number,
    crossSell: crossSellShape,
  };

  static contextTypes = {
    crossSell: crossSellShape,
  };

  state = {
    changeUsers: false,
    selectedRadio: '',
    userSelectInFocus: false,
    userSelectIsInvalid: false,
    userSelectNoMatchesMessage: 'No matches found',
  };

  componentWillMount() {
    const selectedValue = this.props.crossSell.config.startTrial.grantOptionItems[0].value;

    this.setState({
      selectedRadio: selectedValue,
      userSelectInFocus: selectedValue === this.props.crossSell.config.startTrial.grantUsersOption,
    });
  }

  handleContinueClick = () => {
    if (
      this.state.selectedRadio === 'specificUsers' &&
      this.userSelect.state.selectedItems.length === 0
    ) {
      this.setState({
        userSelectIsInvalid: true,
      });
      return;
    }
    this.props.onComplete();
  };

  handleLearnMoreClick = () => {
    // console.log('Learn more clicked');
  };

  handleChangeClick = () => {
    this.setState({
      changeUsers: true,
    });
  };

  handleRadioChange = (evt) => {
    this.setState({
      selectedRadio: evt.target.value,
      userSelectInFocus:
        evt.target.value === this.props.crossSell.config.startTrial.grantUsersOption,
      userSelectIsInvalid: false,
    });
  };

  handleUserSelectOpen = (evt) => {
    if (evt.isOpen) {
      this.setState({
        selectedRadio: this.props.crossSell.config.startTrial.grantUsersOption,
        userSelectNoMatchesMessage: this.userSelect.state.items.length
          ? 'No matches found'
          : 'There was an issue retrieving your users',
      });
    }
  };

  handleUserSelectChange = (evt) => {
    if (evt.items.length === 0) {
      this.setState({
        userSelectIsInvalid: true,
      });
    } else {
      this.setState({
        userSelectIsInvalid: false,
      });
    }
  };

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
  });

  render() {
    // TODO: Populate with real users
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
            {this.props.crossSell.config.productLogo}
            <ProgressBar progress={this.props.crossSell.state.progress} />
          </div>
        }
        footer={
          <StartTrialFooter>
            <Button onClick={this.handleContinueClick} appearance="primary">
              Continue
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            {this.props.crossSell.config.startTrial.grantHeader}
          </StartTrialHeader>

          {this.state.changeUsers
            ? <div>
              <AkFieldRadioGroup
                ref={(radioGroup) => {
                  this.radioGroup = radioGroup;
                }}
                onRadioChange={this.handleRadioChange}
                items={this.props.crossSell.config.startTrial.grantOptionItems.map(item => ({
                  ...item,
                  name: 'access-option',
                  key: item.value,
                  isSelected: this.state.selectedRadio === item.value,
                }))}
                label={this.props.crossSell.config.startTrial.grantChooseOption}
              />
              <UserSelectDiv>
                <Select
                  ref={(userSelect) => {
                    this.userSelect = userSelect;
                  }}
                  id="userSelect"
                  items={selectItems}
                  placeholder={this.props.crossSell.config.startTrial.grantUserSelectPlaceholder}
                  name="test"
                  onOpenChange={this.handleUserSelectOpen}
                  onSelectedChange={this.handleUserSelectChange}
                  shouldFitContainer
                  shouldFocus={this.state.userSelectInFocus}
                  isInvalid={this.state.userSelectIsInvalid}
                  noMatchesFound={this.state.userSelectNoMatchesMessage}
                />
              </UserSelectDiv>

              <AffectMyBillText>
                {this.props.crossSell.config.startTrial.grantAffectBill}
                <Button onClick={this.handleLearnMoreClick} appearance="link">
                  {this.props.crossSell.config.startTrial.grantLearnMoreLinkText}
                </Button>
              </AffectMyBillText>
            </div>
            : <div>
              {React.isValidElement(this.props.crossSell.config.startTrial.grantDefaultAccess)
                  ? this.props.crossSell.config.startTrial.grantDefaultAccess
                  : <p>{this.props.crossSell.config.startTrial.grantDefaultAccess}</p>}

              <ChangeButton>
                <Button onClick={this.handleChangeClick} appearance="link">
                    Change...
                  </Button>
              </ChangeButton>
            </div>}

          <StartTrialProgressDiv>
            <input
              type="checkbox"
              id="notifyUsers"
              name="notify"
              value="Notify the users"
              defaultChecked
            />
            <InputLabel htmlFor="notifyUsers">
              {this.props.crossSell.config.startTrial.grantNotifyUsers}
            </InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(GrantAccessBase, context => context);
