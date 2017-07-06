import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Select from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

import ProgressBar from './ProgressBar';

import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import InputLabel from '../styled/InputLabel';
import UserSelectDiv from '../styled/UserSelectDiv';
import AffectMyBillText from '../styled/AffectMyBillText';
import ChangeButton from '../styled/ChangeButton';
import SpinnerDiv from '../styled/SpinnerDiv';

export class GrantAccessBase extends Component {
  static propTypes = {
    progress: PropTypes.number,
    productLogo: PropTypes.node.isRequired,
    userSelectInFocus: PropTypes.bool,
    userSelectIsInvalid: PropTypes.bool,
    changeUsers: PropTypes.bool,
    defaultSelectedRadio: PropTypes.string,
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
    spinnerActive: PropTypes.bool,
    continueButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    grantAccessToUsers: PropTypes.func,
  };

  static defaultProps = {
    grantAccessToUsers: () => Promise.resolve(),
  };

  state = {
    changeUsers: this.props.changeUsers,
    selectedRadio: this.props.defaultSelectedRadio,
    userSelectInFocus: this.props.userSelectInFocus,
    userSelectIsInvalid: this.props.userSelectIsInvalid,
    userSelectNoMatchesMessage: 'No matches found',
    spinnerActive: this.props.spinnerActive,
    continueButtonDisabled: this.props.continueButtonDisabled,
  };

  handleContinueClick = () => {
    const { grantAccessToUsers, onComplete } = this.props;
    if (
      this.state.selectedRadio === 'specificUsers' &&
      this.userSelect.state.selectedItems.length === 0
    ) {
      this.setState({
        userSelectIsInvalid: true,
      });
      return;
    }
    this.setState({ spinnerActive: true, continueButtonDisabled: true });

    // TODO: Pass list of users from dropdown to grantAccessToUsers callback
    Promise.resolve(grantAccessToUsers(this.state.selectedRadio)).then(onComplete);
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
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              onClick={this.handleContinueClick}
              appearance="primary"
              isDisabled={this.state.continueButtonDisabled}
            >
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
                items={optionItems.map(item => ({
                  ...item,
                  name: 'access-option',
                  key: item.value,
                  isSelected: this.state.selectedRadio === item.value,
                }))}
                label={chooseOption}
              />
              <UserSelectDiv>
                <Select
                  ref={(userSelect) => {
                    this.userSelect = userSelect;
                  }}
                  id="userSelect"
                  items={selectItems}
                  placeholder={userSelectPlaceholder}
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
                  {learnMoreLinkText}
                </Button>
              </AffectMyBillText>
            </div>
            : <div>
              {React.isValidElement(defaultAccess)
                ? defaultAccess
                : <p>
                  {defaultAccess}
                </p>}

              <ChangeButton>
                <Button onClick={this.handleChangeClick} appearance="link">Change...</Button>
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
  ({ crossSell: { config: { productLogo, startTrial }, grantAccessToUsers } }) => ({
    productLogo,
    heading: startTrial.grantHeader,
    defaultAccess: startTrial.grantDefaultAccess,
    learnMoreLinkText: startTrial.grantLearnMoreLinkText,
    notifyUsers: startTrial.grantNotifyUsers,
    optionItems: startTrial.grantOptionItems,
    userSelectPlaceholder: startTrial.grantUserSelectPlaceholder,
    usersOption: startTrial.grantUsersOption,
    chooseOption: startTrial.grantChooseOption,
    affectBill: startTrial.grantAffectBill,
    defaultSelectedRadio: startTrial.grantDefaultSelectedRadio,
    grantAccessToUsers,
  })
);
