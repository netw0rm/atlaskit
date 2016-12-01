import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import styles from 'style!../styles/profilecard.less';
import icons from '../internal/icons';

export default class IconLabel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  }

  render() {
    if (!this.props.children) { return null; }

    const IconElement = icons[this.props.icon];
    const displayIcon = IconElement ? <IconElement /> : null;

    const classes = classNames({
      [styles.detailsLabel]: true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={classes}>
        <div className={styles.detailsLabelIcon}>
          {displayIcon}
        </div>
        <span>{this.props.children}</span>
      </div>
    );
  }
}
