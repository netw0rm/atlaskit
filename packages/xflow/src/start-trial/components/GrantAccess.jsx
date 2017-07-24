import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Select from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { FormattedMessage } from 'react-intl';

import ProgressBar from './ProgressBar';
import ErrorFlag from './ErrorFlag';

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

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import i18nId from '../../common/i18nId';

const i18n = i18nId('grant-access');

export class GrantAccessBase extends Component {
  static propTypes = {
    progress: PropTypes.number,
    productLogo: PropTypes.node.isRequired,
    userSelectInFocus: PropTypes.bool,
    userSelectIsInvalid: PropTypes.bool,
    changeUsers: PropTypes.bool,
    defaultSelectedRadio: PropTypes.string,
    optionItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    userSelectPlaceholder: PropTypes.string,
    usersOption: PropTypes.string,
    chooseOption: PropTypes.string,
    spinnerActive: PropTypes.bool,
    continueButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    grantAccessToUsers: PropTypes.func,
    retrieveUsers: PropTypes.func,
  };

  static defaultProps = {
    retrieveUsers: () => Promise.resolve([{ items: [] }]),
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
    showSkipLink: false,
    selectItems: [{ items: [] }],
    selectedUsers: [],
  };

  componentDidMount = async () => {
    this.setState({
      selectItems: [
        {
          items: (await this.props.retrieveUsers()).map(user => ({
            value: user.name,
            content: user.displayName,
            description: user.email,
          })),
        },
      ],
    });
  };

  handleSkipClick = () => {
    this.props.onComplete();
  };

  handleContinueClick = () => {
    const { grantAccessToUsers, onComplete, usersOption } = this.props;
    const { selectedRadio, selectedUsers } = this.state;
    if (selectedRadio === usersOption && selectedUsers.length === 0) {
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
    Promise.resolve(
      grantAccessToUsers(selectedRadio, selectedRadio === usersOption ? selectedUsers : null)
    )
      .then(onComplete)
      .catch(() => {
        this.setState({
          continueButtonDisabled: false,
          spinnerActive: false,
          failedToGrantAccess: true,
          showSkipLink: true,
        });
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
          ? <FormattedMessage id={i18n`no-matches`} />
          : <FormattedMessage id={i18n`user-select-error`} />,
      });
    }
  };

  handleUserSelectChange = (evt) => {
    this.setState({
      userSelectIsInvalid: evt.items.length === 0,
      selectedUsers: evt.items.map(user => ({ name: user.value })),
    });
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
    const { productLogo, optionItems, userSelectPlaceholder, chooseOption } = this.props;

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
              <FormattedMessage id={i18n`continue-button`} />
            </Button>
            {this.state.showSkipLink
              ? <Button
                onClick={this.handleSkipClick}
                appearance="link"
                isDisabled={this.state.continueButtonDisabled}
              >
                <FormattedMessage id={i18n`skip-link`} />
              </Button>
              : null}
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            <FormattedMessage id={i18n`heading`} />
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
                <FormattedMessage id={i18n`affect-bill`} />
                <Button onClick={this.handleLearnMoreClick} appearance="link">
                  <FormattedMessage id={i18n`learn-more`} />
                </Button>
              </AffectMyBillText>
            </GrantAccessChangeUsersDiv>
            : <GrantAccessDefaultAccessDiv>
              <GrantAccessTextDiv>
                <FormattedMessage id={i18n`default-access`} />
              </GrantAccessTextDiv>
              <ChangeButton>
                <Button onClick={this.handleChangeClick} appearance="link">
                  <FormattedMessage id={i18n`change`} />
                </Button>
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
              <FormattedMessage id={i18n`notify-users`} />
            </InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
        <ErrorFlag
          title="Oops... Something went wrong"
          description="Let's try again."
          showFlag={this.state.failedToGrantAccess}
          onDismissed={() => this.setState({ failedToGrantAccess: false })}
        />
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
  GrantAccessBase,
  ({
    xFlow: { config: { productLogo, startTrial }, grantAccessToUsers, retrieveUsers, progress },
  }) => ({
    productLogo,
    optionItems: startTrial.grantOptionItems,
    userSelectPlaceholder: startTrial.grantUserSelectPlaceholder,
    usersOption: startTrial.grantUsersOption,
    chooseOption: startTrial.grantChooseOption,
    defaultSelectedRadio: startTrial.grantDefaultSelectedRadio,
    grantAccessToUsers,
    retrieveUsers,
    progress,
  })
);
