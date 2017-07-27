import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import MultiSelect from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';

import ProgressIndicator from './ProgressIndicator';
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

import { ACTIVE, ACTIVATING, INACTIVE, UNKNOWN } from '../../common/productProvisioningStates';

const messages = defineMessages({
  noMatchesFound: {
    id: 'xflow.generic.grant-access.no-matches',
    defaultMessage: 'No matches found',
  },
  errorRetrievingUsers: {
    id: 'xflow.generic.grant-access.retrieve-users-error',
    defaultMessage: 'There was an issue retrieving your users.',
  },
  errorFlagTitle: {
    id: 'xflow.generic.grant-access.error-flag.title',
    defaultMessage: 'Oops... Something went wrong',
  },
  errorFlagDescription: {
    id: 'xflow.generic.grant-access.error-flag.description',
    defaultMessage: 'Let\'s try again.',
  },
});

class GrantAccess extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, UNKNOWN]).isRequired,
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
    heading: PropTypes.string,
    defaultAccess: PropTypes.string,
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
    userSelectNoMatchesMessage: this.props.intl.formatMessage(messages.noMatchesFound),
    spinnerActive: this.props.spinnerActive,
    continueButtonDisabled: this.props.continueButtonDisabled,
    failedToGrantAccess: false,
    showSkipLink: false,
    selectItems: [],
    selectedUsers: [],
  };

  componentDidMount = async () => {
    let users = [];
    try {
      users = await this.props.retrieveUsers();
    } catch (e) {
      // TODO: Fire an analytic event, signifying that retrieve users failed.
      console.error('TODO: fire analytics event'); // eslint-disable-line no-console
      console.error(e.message); // eslint-disable-line no-console
      console.error(e.stack); // eslint-disable-line no-console
    }
    if (users && users.length > 0) {
      this.setState({
        selectItems: [
          {
            items: users.map(user => ({
              value: user.name,
              content: user.displayName,
              description: user.email,
            })),
          },
        ],
      });
    }
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
      .then(() => onComplete())
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
    // TODO: Implement me!
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
    const { usersOption, intl } = this.props;
    if (evt.isOpen) {
      this.setState({
        selectedRadio: usersOption,
        userSelectNoMatchesMessage: this.userSelect.state.items.length
          ? intl.formatMessage(messages.noMatchesFound)
          : intl.formatMessage(messages.errorRetrievingUsers),
      });
    }
  };

  handleUserSelectChange = (evt) => {
    this.setState({
      userSelectIsInvalid: evt.items.length === 0,
      selectedUsers: evt.items.map(user => ({ name: user.value })),
    });
  };

  render() {
    const {
      intl,
      productLogo,
      optionItems,
      userSelectPlaceholder,
      chooseOption,
      progress,
      status,
      heading,
      defaultAccess,
    } = this.props;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <StartTrialHeaderDiv>
            {productLogo}
            <ProgressIndicator progress={progress} status={status} />
          </StartTrialHeaderDiv>
        }
        footer={
          <StartTrialFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              id="xflow-grant-access-continue-button"
              onClick={this.handleContinueClick}
              appearance="primary"
              isDisabled={this.state.continueButtonDisabled}
            >
              <FormattedMessage id="xflow.generic.grant-access.continue-button" defaultMessage="Continue" />
            </Button>
            {this.state.showSkipLink
              ? <Button
                onClick={this.handleSkipClick}
                appearance="link"
                isDisabled={this.state.continueButtonDisabled}
              >
                <FormattedMessage id="xflow.generic.grant-access.skip-button" defaultMessage="Skip" />
              </Button>
              : null}
          </StartTrialFooter>
        }
      >
        <StartTrialDialog id="xflow-grant-access">
          <StartTrialHeader>
            { heading }
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
                <MultiSelect
                  ref={(userSelect) => {
                    this.userSelect = userSelect;
                  }}
                  id="userSelect"
                  items={this.state.selectItems}
                  placeholder={userSelectPlaceholder}
                  name="users"
                  onOpenChange={this.handleUserSelectOpen}
                  onSelectedChange={this.handleUserSelectChange}
                  shouldFitContainer
                  shouldFocus={this.state.userSelectInFocus}
                  isInvalid={this.state.userSelectIsInvalid}
                  noMatchesFound={this.state.userSelectNoMatchesMessage}
                />
              </UserSelectDiv>

              <AffectMyBillText>
                <FormattedMessage id="xflow.generic.grant-access.affect-bill" defaultMessage="How will this affect my bill?" />
                <Button onClick={this.handleLearnMoreClick} appearance="link">
                  <FormattedMessage id="xflow.generic.grant-access.learn-more" defaultMessage="Learn more" />
                </Button>
              </AffectMyBillText>
            </GrantAccessChangeUsersDiv>
            : <GrantAccessDefaultAccessDiv>
              <GrantAccessTextDiv>
                { defaultAccess }
              </GrantAccessTextDiv>
              <ChangeButton>
                <Button onClick={this.handleChangeClick} appearance="link">
                  <FormattedMessage id="xflow.generic.grant-access.change" defaultMessage="Change..." />
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
              <FormattedMessage id="xflow.generic.grant-access.notify-users" defaultMessage="Notify these users" />
            </InputLabel>
          </StartTrialProgressDiv>
        </StartTrialDialog>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.failedToGrantAccess}
          onDismissed={() => this.setState({ failedToGrantAccess: false })}
        />
      </ModalDialog>
    );
  }
}

export const GrantAccessBase = injectIntl(GrantAccess);

export default withXFlowProvider(
  GrantAccessBase,
  ({
    xFlow: {
      config: {
        productLogo,
        startTrial: {
          grantOptionItems,
          grantUserSelectPlaceholder,
          grantUsersOption,
          grantChooseOption,
          grantDefaultSelectedRadio,
          grantAccessHeading,
          grantAccessDefaultAccess,
        },
      },
      grantAccessToUsers,
      retrieveUsers,
      progress,
      status,
    },
  }) => ({
    productLogo,
    optionItems: grantOptionItems,
    userSelectPlaceholder: grantUserSelectPlaceholder,
    usersOption: grantUsersOption,
    chooseOption: grantChooseOption,
    defaultSelectedRadio: grantDefaultSelectedRadio,
    grantAccessToUsers,
    retrieveUsers,
    progress,
    status,
    heading: grantAccessHeading,
    defaultAccess: grantAccessDefaultAccess,
  })
);
