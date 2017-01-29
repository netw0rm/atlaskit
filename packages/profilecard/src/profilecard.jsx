import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import AkAvatar from 'ak-avatar';
import AkButton from 'ak-button';

import styles from 'style!./styles/profilecard.less';

import IconLabel from './components/IconLabel';
import presences from './internal/presences';

/**
 * @description Create instances of the Profilecard component in a React context.
 * @class Profilecard
 *
 */
export default class Profilecard extends PureComponent {
  static propTypes = {
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    avatarUrl: PropTypes.string,
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    fullName: PropTypes.string,
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    meta: PropTypes.string,
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    nickname: PropTypes.string,
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    location: PropTypes.string,
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    timestring: PropTypes.string,
     /**
      * @description Indicates the users online status by showing a small icon
      * Allowed values: 'available', 'busy', 'unavailable' or 'none'
      * @memberof Profilecard
      * @instance
      * @default none
      * @type {string}
      */
    presence: PropTypes.oneOf(Object.keys(presences)),
    /**
     * @description Defining the action buttons on the card.
     * Array of one or more action objects with `label` and `callback` keys.
     * `label` defines the button text while `callback` is invoked when
     * the button is clicked.
     * @memberof Profilecard
     * @instance
     * @type {array}
     * @example [{label: 'Chat', callback: () => { ... }}, ... ]
     */
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      callback: React.PropTypes.function,
      label: React.PropTypes.string,
    })),
  }

  static defaultProps = {
    presence: 'none',
  }

  render() {
    const actions = (this.props.actions || []).map(action => (
      <AkButton
        appearance="link"
        compact
        key={action.label}
        onClick={action.callback}
      >{action.label}</AkButton>
    ));

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
          <span className={styles.detailsFullname}>{this.props.fullName}</span>
          { this.props.meta && (<span className={styles.detailsMeta}>{this.props.meta}</span>) }
          <IconLabel className={styles.presence} icon={this.props.presence}>
            {presences[this.props.presence]}
          </IconLabel>
          <IconLabel icon="mention">{this.props.nickname && `@${this.props.nickname}`}</IconLabel>
          <IconLabel icon="time">{this.props.timestring}</IconLabel>
          <IconLabel icon="location">{this.props.location}</IconLabel>
          <div className={styles.actionsFlexSpacer} />
          <div className={styles.actionsWrapper}>
            {actions}
          </div>
        </div>
      </div>
    );
  }
}
