import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class Href extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <a
        tabIndex="-1"
        className={styles.href}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}
