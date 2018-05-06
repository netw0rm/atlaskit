import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import MultiSelect from '@atlaskit/multi-select';
import Spinner from '@atlaskit/spinner';
import ModalDialog from '@atlaskit/modal-dialog';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import '@atlaskit/polyfills/array-prototype-includes';

import ProgressIndicator from './ProgressIndicator';
import ErrorFlag from '../../common/components/ErrorFlag';

import StartTrialHeading from '../styled/StartTrialHeading';
import ModalDialogHeader from '../../common/styled/ModalDialogHeader';
import ModalDialogFooter from '../../common/styled/ModalDialogFooter';
import StartTrialProgressDiv from '../styled/StartTrialProgressDiv';
import GrantAccessDefaultAccessDiv from '../styled/GrantAccessDefaultAccessDiv';
import GrantAccessLearnMoreSpan from '../styled/GrantAccessLearnMoreSpan';
import GrantAccessChangeUsersDiv from '../styled/GrantAccessChangeUsersDiv';
import GrantAccessChangeUsersWithLabelDiv from '../styled/GrantAccessChangeUsersWithLabelDiv';
import InputLabel from '../styled/InputLabel';
import UserSelectDiv from '../styled/UserSelectDiv';
import AffectMyBillText from '../styled/AffectMyBillText';
import SpinnerDiv from '../../common/styled/SpinnerDiv';

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
    laterOption: PropTypes.string,
    learnMoreLink: PropTypes.string,
    selectLabel: PropTypes.string,
    defaultSelectedRadio: PropTypes.string,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN]).isRequired,
    heading: PropTypes.string,
    defaultAccess: PropTypes.node,

    userSelectInFocus: PropTypes.bool,
    userSelectIsInvalid: PropTypes.bool,
    changeUsers: PropTypes.bool,
    spinnerActive: PropTypes.bool,
    continueButtonDisabled: PropTypes.bool,

    grantAccessToUsers: PropTypes.func,
    retrieveUsers: PropTypes.func,
    retrieveAdminIds: PropTypes.func,
    onComplete: PropTypes.func.isRequired,

    showNotifyUsersOption: PropTypes.bool,
    showProgressIndicator: PropTypes.bool,
    showAffectMyBill: PropTypes.bool,

    intl: intlShape.isRequired,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    grantAccessToUsers: () => {},
    retrieveUsers: () => [],
    retrieveAdminIds: () => [],
    showNotifyUsersOption: true,
    showProgressIndicator: true,
    showAffectMyBill: true,
  };

  state = {
    changeUsers: this.props.changeUsers,
    selectedRadio: this.props.defaultSelectedRadio,
    userSelectInFocus: this.props.userSelectInFocus,
    userSelectIsInvalid: this.props.userSelectIsInvalid,
    userSelectNoMatchesMessage: this.props.intl.formatMessage(messages.noMatchesFound),
    userSets: null,
    spinnerActive: this.props.spinnerActive,
    continueButtonDisabled: this.props.continueButtonDisabled,
    failedToGrantAccess: false,
    showSkipLink: false,
    selectItems: [],
    selectedUsers: [],
    notifyUsers: true,
  };

  componentDidMount = async () => {
    const {
      firePrivateAnalyticsEvent,
      retrieveUsers,
      retrieveAdminIds,
      usersOption,
    } = this.props;

    try {
      const fetchedUsers = await retrieveUsers();
      const adminIds = await retrieveAdminIds();
      const adminUsers = fetchedUsers.filter(user => adminIds.includes(user.id));
      const userSets = {
        everyone: fetchedUsers,
        'site-admins': adminUsers,
        'specific-users': fetchedUsers,
      };

      const selectableUsers = userSets[usersOption];
      const selectItems = [
        {
          items: selectableUsers.map(user => ({
            value: user.userName,
            content: user.displayName,
            description: user.emails[0].value,
            filterValues: [user.emails[0].value, user.userName, user.displayName],
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
        errorMessage: e.message,
      });
    }
  };

  getAtlassianAccountId = ({ attributes: { attributes } }) => {
    if (!attributes) return '';
    const openIdAttr = attributes.find(attr => attr.name === 'atlassianid.openid.identity');
    return openIdAttr ? openIdAttr.values[0] : '';
  };

  handleContinueClick = async () => {
    const {
      grantAccessToUsers,
      onComplete,
      usersOption,
      laterOption,
      firePrivateAnalyticsEvent,
      showNotifyUsersOption,
    } = this.props;
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

    if (selectedRadio === laterOption) {
      return onComplete(); // eslint-disable-line consistent-return
    }

    try {
      const users =
        selectedRadio === usersOption ? selectedUsers : userSets[selectedRadio];

      // when the notification control is hidden, we never send notifications
      const doNotification = showNotifyUsersOption ? notifyUsers : false;
      await grantAccessToUsers(users, doNotification);

      const grantedAccessTo = users.map(user => this.getAtlassianAccountId(user));
      firePrivateAnalyticsEvent('xflow.grant-access.continue-button.grant-access-successful', {
        atlassianAccountIds: grantedAccessTo.join(','),
      });

      return onComplete(); // eslint-disable-line consistent-return
    } catch (e) {
      firePrivateAnalyticsEvent('xflow.grant-access.continue-button.failed-to-grant-access', {
        errorMessage: e.message,
      });
      this.setState({
        continueButtonDisabled: false,
        spinnerActive: false,
        failedToGrantAccess: true,
        showSkipLink: true,
      });
    }
  };

  handleSkipClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.skip-button.clicked');
    this.props.onComplete();
  };

  handleLearnMoreClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.learn-more-button.clicked');
  };

  // This is necessary to capture middle and right mouse clicks
  // while not breaking keyboard functionality
  handleLearnMoreAlternateClick = evt => {
    if (evt.button > 0) {
      const { firePrivateAnalyticsEvent } = this.props;
      firePrivateAnalyticsEvent('xflow.grant-access.learn-more-button.clicked');
    }
  };

  handleManageClick = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.manage-button.clicked');
    this.setState({
      changeUsers: true,
    });
  };

  handleDialogClosed = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.dialog.closed');
  };

  handleRadioChange = evt => {
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

  handleUserSelectOpen = evt => {
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

  handleUserSelectChange = evt => {
    const { firePrivateAnalyticsEvent, usersOption } = this.props;
    const { userSets } = this.state;
    const selectedUsers = evt.items.map(user =>
      userSets[usersOption].filter(userInfo => userInfo.userName === user.value)[0]
    );

    firePrivateAnalyticsEvent('xflow.grant-access.user-select.changed');
    this.setState({
      userSelectIsInvalid: evt.items.length === 0,
      selectedUsers,
    });
  };

  handleCheckboxChange = evt => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.notify-users.changed', {
      notifyUsers: evt.target.checked,
    });
    this.setState({
      notifyUsers: evt.target.checked,
    });
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.grant-access.error-flag.dismissed');
    this.setState({
      failedToGrantAccess: false,
    });
  };

  render() {
    const {
      intl,
      productLogo,
      optionItems,
      userSelectPlaceholder,
      learnMoreLink,
      selectLabel,
      progress,
      status,
      heading,
      defaultAccess,
      showNotifyUsersOption,
      showProgressIndicator,
    } = this.props;

    const progressIndicator = showProgressIndicator ? (
      <ProgressIndicator progress={progress} status={status} />
    ) : (
      ''
    );

    const GrantAccessChangeUsers = selectLabel
      ? GrantAccessChangeUsersWithLabelDiv
      : GrantAccessChangeUsersDiv;

    return (
      <ModalDialog
        width="small"
        header={() => (
          <ModalDialogHeader>
            {productLogo}
            {progressIndicator}
          </ModalDialogHeader>
        )}
        footer={() => (
          <ModalDialogFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!(this.state.spinnerActive || this.state.userSets === null)} />
            </SpinnerDiv>
            <Button
              id="xflow-grant-access-continue-button"
              onClick={this.handleContinueClick}
              appearance="primary"
              isDisabled={this.state.continueButtonDisabled || this.state.userSets === null}
            >
              <FormattedMessage
                id="xflow.generic.grant-access.continue-button"
                defaultMessage="Continue"
              />
            </Button>
            {this.state.showSkipLink ? (
              <Button
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
            ) : (
              !this.state.changeUsers && (
                <Button
                  id="xflow-grant-access-manage-button"
                  onClick={this.handleManageClick}
                  appearance="link"
                  isDisabled={this.state.userSets === null}
                >
                  <FormattedMessage
                    id="xflow.generic.grant-access.manage"
                    defaultMessage="Manage"
                  />
                </Button>
              )
            )}
          </ModalDialogFooter>
        )}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onClose={this.handleDialogClosed}
      >
        <div id="xflow-grant-access">
          <StartTrialHeading>
            <div>{heading}</div>
          </StartTrialHeading>

          {this.state.changeUsers ? (
            <GrantAccessChangeUsers>
              <AkFieldRadioGroup
                ref={radioGroup => {
                  this.radioGroup = radioGroup;
                }}
                label={selectLabel}
                onRadioChange={this.handleRadioChange}
                items={optionItems.map(item => ({
                  ...item,
                  name: 'access-option',
                  key: item.value,
                  isSelected: this.state.selectedRadio === item.value,
                }))}
              />
              <UserSelectDiv>
                <MultiSelect
                  ref={userSelect => {
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

              {this.props.showAffectMyBill ? (
                <AffectMyBillText>
                  <FormattedMessage
                    id="xflow.generic.grant-access.affect-bill"
                    defaultMessage="How will this affect my bill?"
                  />
                  <GrantAccessLearnMoreSpan>
                    <span
                      onMouseDown={this.handleLearnMoreAlternateClick}
                      id="xflow-grant-access-learn-more-span"
                    >
                      <Button
                        id="xflow-grant-access-learn-more-button"
                        onClick={this.handleLearnMoreClick}
                        appearance="link"
                        href={learnMoreLink}
                        target="_blank"
                      >
                        <FormattedMessage
                          id="xflow.generic.grant-access.learn-more"
                          defaultMessage="Learn more"
                        />
                      </Button>
                    </span>
                  </GrantAccessLearnMoreSpan>
                </AffectMyBillText>
              ) : null}
            </GrantAccessChangeUsers>
          ) : (
            <GrantAccessDefaultAccessDiv>
              <div>{defaultAccess}</div>
            </GrantAccessDefaultAccessDiv>
          )}

          {showNotifyUsersOption ? (
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
          ) : (
            ''
          )}
        </div>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={this.state.failedToGrantAccess}
          source="grant-access"
          onDismissed={this.handleErrorFlagDismiss}
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
          grantAccessLaterOption,
          grantAccessShowNotifyUsersOption,
          grantAccessShowProgressIndicator,
          grantAccessShowAffectMyBill,
          grantAccessLearnMoreLink,
          grantAccessSelectLabel,
          grantAccessDefaultSelectedRadio,
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
    optionItems: grantAccessOptionItems,
    userSelectPlaceholder: grantAccessUserSelectPlaceholder,
    usersOption: grantAccessUsersOption,
    laterOption: grantAccessLaterOption,
    showNotifyUsersOption: grantAccessShowNotifyUsersOption,
    showProgressIndicator: grantAccessShowProgressIndicator,
    showAffectMyBill: grantAccessShowAffectMyBill,
    learnMoreLink: grantAccessLearnMoreLink,
    selectLabel: grantAccessSelectLabel,
    defaultSelectedRadio: grantAccessDefaultSelectedRadio,
    grantAccessToUsers,
    retrieveUsers,
    progress,
    status,
    heading: grantAccessHeading,
    defaultAccess: grantAccessDefaultAccess,
  })
);
