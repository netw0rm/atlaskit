import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!./less/HorizontalNavigation.less';

export default class HorizontalNavigation extends PureComponent {
  render() {
    return (<div className={classNames(styles.horizontalNavigation)}>
      <div className={styles.primaryContainer}>
        <h1>JIRA Service Desk Cloud</h1>
      </div>
      <div className={styles.secondaryContainer}>
        <form>
          <input type="text" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>);
  }
}
