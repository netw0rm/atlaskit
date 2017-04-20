import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';

import styles from './styles/profilecard.less';

import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import HeightTransitionWrapper from './components/HeightTransitionWrapper';

import IconLabel from './components/IconLabel';
import presences from './internal/presences';

export default class Profilecard extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    meta: PropTypes.string,
    nickname: PropTypes.string,
    location: PropTypes.string,
    timestring: PropTypes.string,
    presence: PropTypes.oneOf(Object.keys(presences)),
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.function,
      label: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    clientFetchProfile: PropTypes.func,

  }

  static defaultProps = {
    presence: 'none',
    actions: [],
    isLoading: false,
    hasError: false,
  }

  renderActionsButtons() {
    if (this.props.actions.length === 0) {
      return null;
    }

    return (
      <div className={styles.actionsWrapper}>
        {(this.props.actions).map((action, idx) => (
          <AkButton
            appearance={idx === 0 ? 'default' : 'subtle'}
            compact
            key={action.label}
            onClick={action.callback}
          >{action.label}</AkButton>
        ))}
      </div>
    );
  }

  renderErrorMessage() {
    return (<ErrorMessage reload={this.props.clientFetchProfile} />);
  }

  renderProfilecard() {
    const cardClasses = classNames([
      styles.profilecard,
      { [styles.noDetailsMeta]: !this.props.meta },
    ]);

    return (
      <div className={cardClasses}>
        <div className={styles.avatarWrapper}>
          <AkAvatar size="xlarge" src={this.props.avatarUrl} />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsGroup}>
            <span className={styles.detailsFullname}>{this.props.fullName}</span>
            { this.props.meta && (<span className={styles.detailsMeta}>{this.props.meta}</span>) }
            <IconLabel className={styles.presence} icon={this.props.presence}>
              {presences[this.props.presence]}
            </IconLabel>
            <IconLabel icon="mention">{this.props.nickname && `@${this.props.nickname}`}</IconLabel>
            <IconLabel icon="time">{this.props.timestring}</IconLabel>
            <IconLabel icon="location">{this.props.location}</IconLabel>
          </div>
          <div className={styles.actionsFlexSpacer} />
          {this.renderActionsButtons()}
        </div>
      </div>
    );
  }

  render() {
    let cardContent = null;

    if (this.props.hasError) {
      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = <LoadingMessage />;
    } else {
      cardContent = this.renderProfilecard();
    }

    return (
      <HeightTransitionWrapper>
        {cardContent}
      </HeightTransitionWrapper>
    );
  }
}
