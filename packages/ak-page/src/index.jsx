import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./style.less';
// import classNames from 'classnames';

export default class Page extends PureComponent {
  static propTypes = {
    banner: PropTypes.element,
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={styles.pageRoot}>
        { this.props.banner }
        <div className={styles.pageMainContent}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
