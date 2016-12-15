import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import { LocationIcon, TimeIcon, EditorMentionIcon } from 'ak-icon';

import styles from 'style!../styles/profilecard.less';
import { available, unavailable, busy } from '../internal/presence_icons';

const icons = {
  location: LocationIcon,
  time: TimeIcon,
  mention: EditorMentionIcon,
  available,
  unavailable,
  busy,
};

export default class IconLabel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  }

  render() {
    if (!this.props.children) { return null; }

    const IconElement = icons[this.props.icon];
    const displayIcon = IconElement ? <IconElement label={`icon ${this.props.icon}`} /> : null;

    const classes = classNames({
      [styles.detailsLabel]: true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={classes}>
        <div className={styles.detailsLabelIcon}>
          {displayIcon}
        </div>
        <span className={styles.label}>{this.props.children}</span>
      </div>
    );
  }
}
