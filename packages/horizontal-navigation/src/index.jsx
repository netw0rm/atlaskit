import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./less/HorizontalNavigation.less';

export default class HorizontalNavigation extends PureComponent {
  static propTypes = {
    logo: PropTypes.node,
    title: PropTypes.string,
  };

  render() {
    const {
      logo,
      title,
    } = this.props;

    return (<div className={classNames(styles.horizontalNavigation)}>
      <div className={styles.primaryContainer}>
        {logo ? <span className={styles.logo}>{logo}</span> : null}
        <div className={styles.primaryTitle}>{title}</div>
      </div>

      <div className={styles.secondaryContainer} />
    </div>);
  }
}
