import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { colors } from '@atlaskit/theme';
import AkSpinner from '@atlaskit/spinner';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';

import ErrorMessage from './components/ErrorMessage';
import HeightTransitionWrapper from './components/HeightTransitionWrapper';
import IconLabel from './components/IconLabel';
import presences from './internal/presences';

import {
  CardContainer,
  SpinnerContainer,
  ProfileImage,
  CardContent,
  DetailsGroup,
  FullNameLabel,
  JobTitleLabel,
  ActionsFlexSpacer,
  ActionButtonGroup,
} from './styled/Card';

export default class Profilecard extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    meta: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    timestring: PropTypes.string,
    presence: PropTypes.oneOf(Object.keys(presences)),
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.function,
      id: PropTypes.string,
      label: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    errorType: PropTypes.shape({
      reason: PropTypes.oneOf(['default', 'NotFound']),
    }),
    clientFetchProfile: PropTypes.func,
    analytics: PropTypes.func,
  }

  static defaultProps = {
    presence: 'none',
    actions: [],
    isLoading: false,
    hasError: false,
    analytics: () => {},
  }

  constructor(options) {
    super(options);

    this._timeOpen = null;

    this.clientFetchProfile = (...args) => {
      this.props.analytics('profile-card.reload', {});
      this.props.clientFetchProfile(...args);
    };
  }

  componentDidMount() {
    this._timeOpen = Date.now();
    this.props.analytics('profile-card.view', {});
  }

  _durationSince = (from) => {
    const fromParsed = parseInt(from, 10) || 0;
    return fromParsed > 0 ? Date.now() - fromParsed : null;
  }

  renderActionsButtons() {
    if (this.props.actions.length === 0) {
      return null;
    }

    return (
      <ActionButtonGroup>
        {(this.props.actions).map((action, idx) => (
          <AkButton
            appearance={idx === 0 ? 'default' : 'subtle'}
            compact
            key={action.label}
            onClick={(...args) => {
              this.props.analytics('profile-card.click', {
                id: action.id || null,
                duration: this._durationSince(this._timeOpen),
              });
              action.callback(...args);
            }}
          >{action.label}</AkButton>
        ))}
      </ActionButtonGroup>
    );
  }

  renderErrorMessage() {
    return (<ErrorMessage
      reload={this.props.clientFetchProfile && this.clientFetchProfile}
      errorType={this.props.errorType}
    />);
  }

  renderProfilecard() {
    this.props.analytics('profile-card.loaded', {
      duration: this._durationSince(this._timeOpen),
    });

    return (
      <CardContainer>
        <ProfileImage>
          <AkAvatar
            size="xlarge"
            src={this.props.avatarUrl}
            borderColor={colors.N0}
          />
        </ProfileImage>
        <CardContent>
          <DetailsGroup>
            <FullNameLabel noMeta={!this.props.meta}>{this.props.fullName}</FullNameLabel>
            {this.props.meta && (
              <JobTitleLabel>{this.props.meta}</JobTitleLabel>
            )}
            <IconLabel icon={this.props.presence}>
              {presences[this.props.presence]}
            </IconLabel>
            <IconLabel icon="email">{this.props.email}</IconLabel>
            <IconLabel icon="mention">{this.props.nickname && `@${this.props.nickname}`}</IconLabel>
            <IconLabel icon="time">{this.props.timestring}</IconLabel>
            <IconLabel icon="location">{this.props.location}</IconLabel>
          </DetailsGroup>
          <ActionsFlexSpacer />
          {this.renderActionsButtons()}
        </CardContent>
      </CardContainer>
    );
  }

  render() {
    let cardContent = null;

    if (this.props.hasError) {
      this.props.analytics('profile-card.error', {});

      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = <SpinnerContainer><AkSpinner /></SpinnerContainer>;
    } else if (this.props.fullName) {
      cardContent = this.renderProfilecard();
    }

    return (
      <HeightTransitionWrapper>
        {cardContent}
      </HeightTransitionWrapper>
    );
  }
}
