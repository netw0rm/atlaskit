import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Select from '@atlaskit/multi-select';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import {
  withCrossSellProvider,
  crossSellShape,
} from '../../common/components/CrossSellProvider';

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
    productLogo: PropTypes.node.isRequired,
    userSelectInFocus: PropTypes.boolean,
    userSelectIsInvalid: PropTypes.boolean,
    changeUsers: PropTypes.boolean,
    selectedRadio: PropTypes.string,
    heading: PropTypes.string,
    defaultAccess: PropTypes.node,
    learnMoreLinkText: PropTypes.string,
    notifyUsers: PropTypes.string,
    optionItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    userSelectPlaceholder: PropTypes.string,
    usersOption: PropTypes.string,
    chooseOption: PropTypes.string,
    affectBill: PropTypes.string,
  };

  static contextTypes = {
    crossSell: crossSellShape,
  };

  state = {
    changeUsers: this.props.changeUsers,
    selectedRadio: this.props.selectedRadio,
    userSelectInFocus: this.props.userSelectInFocus,
    userSelectIsInvalid: this.props.userSelectIsInvalid,
    userSelectNoMatchesMessage: 'No matches found',
  };

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
    const { usersOption } = this.props;
    this.setState({
      selectedRadio: evt.target.value,
      userSelectInFocus: evt.target.value === usersOption,
      userSelectIsInvalid: false,
    });
  };

  handleUserSelectOpen = (evt) => {
    const { usersOption } = this.props;
    if (evt.isOpen) {
      this.setState({
        selectedRadio: usersOption,
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

    const {
      productLogo,
      heading,
      defaultAccess,
      learnMoreLinkText,
      notifyUsers,
      optionItems,
      userSelectPlaceholder,
      chooseOption,
      affectBill,
    } = this.props;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <div>
            {productLogo}
            <ProgressBar progress={this.props.progress} />
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
            {heading}
          </StartTrialHeader>

          {this.state.changeUsers
            ? <div>
              <AkFieldRadioGroup
                ref={(radioGroup) => {
                  this.radioGroup = radioGroup;
                }}
                onRadioChange={this.handleRadioChange}
                items={optionItems.map(
                  item => ({
                    ...item,
                    name: 'access-option',
                    key: item.value,
                    isSelected: this.state.selectedRadio === item.value,
                  })
                )}
                label={
                  chooseOption
                }
              />
              <UserSelectDiv>
                <Select
                  ref={(userSelect) => {
                    this.userSelect = userSelect;
                  }}
                  id="userSelect"
                  items={selectItems}
                  placeholder={
                    userSelectPlaceholder
                  }
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
                {affectBill}
                <Button onClick={this.handleLearnMoreClick} appearance="link">
                  {
                    learnMoreLinkText
                  }
                </Button>
              </AffectMyBillText>
            </div>
            : <div>
              {React.isValidElement(
                defaultAccess
              )
                ? defaultAccess
                : <p>
                  {
                    defaultAccess
                  }
                </p>}

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
              {notifyUsers}
            </InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  GrantAccessBase,
  ({ crossSell: { config: { productLogo, startTrial } } }) => ({
    productLogo,
    heading: startTrial.grantHeader,
    defaultAccess: startTrial.grantDefaultAccess,
    learnMoreLinkText: startTrial.grantLearnMoreLinkText,
    notifyUsers: startTrial.grantNotifyUsers,
    optionItems: startTrial.grantOptionItems,
    userSelectPlaceholder: startTrial.UserSelectPlaceholder,
    usersOption: startTrial.UsersOption,
    chooseOption: startTrial.ChooseOption,
    affectBill: startTrial.AffectBill,
  })
);
