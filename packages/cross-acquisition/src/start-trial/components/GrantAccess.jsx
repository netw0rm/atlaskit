import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import InlineMessage from '@atlaskit/inline-message';
import Select from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

import ProgressBar from './ProgressBar';

import ErrorTextDiv from '../styled/ErrorTextDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import StartTrialHeaderDiv from '../styled/StartTrialHeaderDiv';
import GrantAccessChangeUsersDiv from '../styled/GrantAccessChangeUsersDiv';
import GrantAccessDefaultAccessDiv from '../styled/GrantAccessDefaultAccessDiv';
import GrantAccessTextDiv from '../styled/GrantAccessTextDiv';
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
    retrieveJiraUsers: PropTypes.func,
  };

  static defaultProps = {
    retrieveJiraUsers: () => Promise.resolve([{ items: [] }]),
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
    failedToGrantAccess: false,
    selectItems: [{ items: [] }],
  };

  componentDidMount = () => {
    this.props.retrieveJiraUsers().then(jiraUsers => this.setState({ selectItems: jiraUsers }));
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
    this.setState({
      spinnerActive: true,
      continueButtonDisabled: true,
      failedToGrantAccess: false,
    });

    // TODO: Pass list of users from dropdown to grantAccessToUsers callback
    Promise.resolve(grantAccessToUsers(this.state.selectedRadio)).then(onComplete).catch(() => {
      setTimeout(() => {
        this.setState({
          continueButtonDisabled: false,
          spinnerActive: false,
          failedToGrantAccess: true,
        });
      }, 1500);
    });
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
          <StartTrialHeaderDiv>
            {productLogo}
            <ProgressBar progress={this.props.progress} />
          </StartTrialHeaderDiv>
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
            {this.state.failedToGrantAccess &&
              <InlineMessage
                title="Something went wrong"
                type="error"
              >
                <ErrorTextDiv>
                  There was an issue granting access to the selected users. Please try again.
                </ErrorTextDiv>
              </InlineMessage>}
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            {heading}
          </StartTrialHeader>

          {this.state.changeUsers
            ? <GrantAccessChangeUsersDiv>
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
                  items={this.state.selectItems}
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
            </GrantAccessChangeUsersDiv>
            : <GrantAccessDefaultAccessDiv>
              <GrantAccessTextDiv>
                {React.isValidElement(defaultAccess)
                  ? defaultAccess
                  : <p>
                    {defaultAccess}
                  </p>}
              </GrantAccessTextDiv>
              <ChangeButton>
                <Button onClick={this.handleChangeClick} appearance="link">Change...</Button>
              </ChangeButton>
            </GrantAccessDefaultAccessDiv>}

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
  ({ crossSell: {
    config: { productLogo, startTrial },
    grantAccessToUsers,
    retrieveJiraUsers } }) => ({
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
      retrieveJiraUsers,
    })
);
