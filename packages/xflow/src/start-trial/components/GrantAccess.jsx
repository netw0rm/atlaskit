import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import MultiSelect from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import ProgressIndicator from './ProgressIndicator';
import ErrorFlag from './ErrorFlag';

import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import StartTrialHeaderDiv from '../styled/StartTrialHeaderDiv';
import GrantAccessChangeUsersDiv from '../styled/GrantAccessChangeUsersDiv';
import GrantAccessDefaultAccessDiv from '../styled/GrantAccessDefaultAccessDiv';
import InputLabel from '../styled/InputLabel';
import UserSelectDiv from '../styled/UserSelectDiv';
import AffectMyBillText from '../styled/AffectMyBillText';
import ChangeButton from '../styled/ChangeButton';
import SpinnerDiv from '../styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../common/productProvisioningStates';

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
    defaultMessage: "Let's try again.",
  },
});

function* iterate(it) {
  yield* it;
}

// Zip generator from
// https://github.com/lachlanhunt/generator-utilities
function* zip(...them) {
  if (them.length) {
    const iterators = them.map(iterate);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const values = iterators.map(iterator => iterator.next());
      if (values.some(value => value.done)) return;
      yield values.map(value => value.value);
    }
  }
}

class GrantAccess extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    optionItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ).isRequired,
    userSelectPlaceholder: PropTypes.string,
    usersOption: PropTypes.string,
    chooseOption: PropTypes.string,
    defaultSelectedRadio: PropTypes.string,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]).isRequired,
    heading: PropTypes.string,
    defaultAccess: PropTypes.string,

    intl: intlShape.isRequired,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,

    userSelectInFocus: PropTypes.bool,
    userSelectIsInvalid: PropTypes.bool,
    changeUsers: PropTypes.bool,
    spinnerActive: PropTypes.bool,
    continueButtonDisabled: PropTypes.bool,

    grantAccessToUsers: PropTypes.func,
    retrieveUsers: PropTypes.func,
    goToLearnMore: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    grantAccessToUsers: async () => {},
    retrieveUsers: async () => [],
    goToLearnMore: async () => {},
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
    notifyUsers: true,
  };

  componentDidMount = async () => {
    const { firePrivateAnalyticsEvent, optionItems, retrieveUsers, usersOption } = this.props;

    try {
      const userGroups = optionItems.map(option => option.value);
      const fetchedUsers = await Promise.all(userGroups.map(retrieveUsers));
      const userSets = new Map([
        ...zip(
          userGroups,
          fetchedUsers.map(users => new Map(users.map(user => [user.name, user])))
        ),
      ]);

      const selectableUsers = [...userSets.get(usersOption).values()];
      const selectItems = [
        {
          items: selectableUsers.map(user => ({
            value: user.name,
            content: user['display-name'],
            description: user.email,
          })),
        },
      ];

      this.setState({
        userSets,
        selectItems,
      });

      firePrivateAnalyticsEvent('xflow.grant-access.displayed');
    } catch (e) {
      firePrivateAnalyticsEvent('xflow.grant-access.retrieving.users.failed', {
        ErrorMessage: e.message,
        ErrorStack: e.stack,
      });
    }
  };

  handleSkipClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.skip-button.clicked');
    this.props.onComplete();
  };

  handleContinueClick = async () => {
    const { grantAccessToUsers, onComplete, usersOption, firePrivateAnalyticsEvent } = this.props;
    const { selectedRadio, selectedUsers, userSets, notifyUsers } = this.state;
    if (selectedRadio === usersOption && selectedUsers.length === 0) {
      firePrivateAnalyticsEvent('xflow.grant-access.continue-button.user-select.invalid');
      this.setState({
        userSelectIsInvalid: true,
      });
      return;
    }
    firePrivateAnalyticsEvent('xflow.grant-access.continue-button.clicked', {
      selectedRadio,
      notfiyUsers: this.state.notifyUsers,
      numberOfSelectedUsers: Object.keys(this.state.selectedUsers).length,
    });
    this.setState({
      spinnerActive: true,
      continueButtonDisabled: true,
      failedToGrantAccess: false,
    });

    try {
      const users =
        selectedRadio === usersOption ? selectedUsers : [...userSets.get(selectedRadio).values()];
      await grantAccessToUsers(users, notifyUsers);
      firePrivateAnalyticsEvent('xflow.grant-access.continue-button.grant-access-successful');
      onComplete();
    } catch (e) {
      firePrivateAnalyticsEvent('xflow.grant-access.continue-button.failed-to-grant-access');
      this.setState({
        continueButtonDisabled: false,
        spinnerActive: false,
        failedToGrantAccess: true,
        showSkipLink: true,
      });
    }
  };

  handleLearnMoreClick = () => {
    const { goToLearnMore, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.learn-more-button.clicked');
    goToLearnMore();
  };

  handleChangeClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.change-button.clicked');
    this.setState({
      changeUsers: true,
    });
  };

  handleRadioChange = (evt) => {
    const { usersOption, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.radio-option.changed', {
      selectedRadio: evt.target.value,
    });
    this.setState({
      selectedRadio: evt.target.value,
      userSelectInFocus: evt.target.value === usersOption,
      userSelectIsInvalid: false,
    });
  };

  handleUserSelectOpen = (evt) => {
    const { usersOption, intl, firePrivateAnalyticsEvent } = this.props;
    if (evt.isOpen) {
      firePrivateAnalyticsEvent('xflow.grant-access.user-select.opened');
      this.setState({
        selectedRadio: usersOption,
        userSelectNoMatchesMessage: this.userSelect.state.items.length
          ? intl.formatMessage(messages.noMatchesFound)
          : intl.formatMessage(messages.errorRetrievingUsers),
      });
    }
  };

  handleUserSelectChange = (evt) => {
    const { firePrivateAnalyticsEvent, usersOption } = this.props;
    const { userSets } = this.state;
    const selectedUsers = evt.items.map(user => userSets.get(usersOption).get(user.value));

    firePrivateAnalyticsEvent('xflow.grant-access.user-select.changed');
    this.setState({
      userSelectIsInvalid: evt.items.length === 0,
      selectedUsers,
    });
  };

  handleCheckboxChange = (evt) => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.notify-users.changed', {
      notifyUsers: evt.target.checked,
    });
    this.setState({
      notifyUsers: evt.target.checked,
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
              <FormattedMessage
                id="xflow.generic.grant-access.continue-button"
                defaultMessage="Continue"
              />
            </Button>
            {this.state.showSkipLink
              ? <Button
                id="xflow-grant-access-skip-button"
                onClick={this.handleSkipClick}
                appearance="link"
                isDisabled={this.state.continueButtonDisabled}
              >
                <FormattedMessage
                  id="xflow.generic.grant-access.skip-button"
                  defaultMessage="Skip"
                />
              </Button>
              : null}
          </StartTrialFooter>
        }
      >
        <div id="xflow-grant-access">
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
                <MultiSelect
                  ref={(userSelect) => {
                    this.userSelect = userSelect;
                  }}
                  id="xflow-grant-access-user-select"
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
                <FormattedMessage
                  id="xflow.generic.grant-access.affect-bill"
                  defaultMessage="How will this affect my bill?"
                />
                <Button
                  id="xflow-grant-access-learn-more-button"
                  onClick={this.handleLearnMoreClick}
                  appearance="link"
                >
                  <FormattedMessage
                    id="xflow.generic.grant-access.learn-more"
                    defaultMessage="Learn more"
                  />
                </Button>
              </AffectMyBillText>
            </GrantAccessChangeUsersDiv>
            : <GrantAccessDefaultAccessDiv>
              <div>
                {defaultAccess}
              </div>
              <ChangeButton>
                <Button
                  id="xflow-grant-access-change-button"
                  onClick={this.handleChangeClick}
                  appearance="link"
                >
                  <FormattedMessage
                    id="xflow.generic.grant-access.change"
                    defaultMessage="Change..."
                  />
                </Button>
              </ChangeButton>
            </GrantAccessDefaultAccessDiv>}

          <StartTrialProgressDiv>
            <input
              type="checkbox"
              id="xflow-grant-access-notify-users"
              name="notify"
              defaultChecked
              onChange={this.handleCheckboxChange}
            />
            <InputLabel htmlFor="xflow-grant-access-notify-users">
              <FormattedMessage
                id="xflow.generic.grant-access.notify-users"
                defaultMessage="Notify these users"
              />
            </InputLabel>
          </StartTrialProgressDiv>
        </div>
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

export const GrantAccessBase = withAnalytics(injectIntl(GrantAccess));

export default withXFlowProvider(
  GrantAccessBase,
  ({
    xFlow: {
      config: {
        productLogo,
        startTrial: {
          grantAccessOptionItems,
          grantAccessUserSelectPlaceholder,
          grantAccessUsersOption,
          grantAccessChooseOption,
          grantAccessDefaultSelectedRadio,
          grantAccessHeading,
          grantAccessDefaultAccess,
        },
      },
      grantAccessToUsers,
      retrieveUsers,
      progress,
      status,
      goToLearnMore,
    },
  }) => ({
    productLogo,
    optionItems: grantAccessOptionItems,
    userSelectPlaceholder: grantAccessUserSelectPlaceholder,
    usersOption: grantAccessUsersOption,
    chooseOption: grantAccessChooseOption,
    defaultSelectedRadio: grantAccessDefaultSelectedRadio,
    grantAccessToUsers,
    retrieveUsers,
    progress,
    status,
    goToLearnMore,
    heading: grantAccessHeading,
    defaultAccess: grantAccessDefaultAccess,
  })
);
