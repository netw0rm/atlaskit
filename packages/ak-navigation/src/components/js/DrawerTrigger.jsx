import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/DrawerTrigger.less';

export default class DrawerTrigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onActivate: PropTypes.func,
  };
  static defaultProps = {
    onActivate: () => {},
  };

  render() {
    if (this.props.children === null) return null;
    return (
      <button
        aria-haspopup="true"
        onClick={this.props.onActivate}
        onMouseDown={e => e.preventDefault()}
        className={styles.drawerTrigger}
      >
        {this.props.children}
      </button>
    );
  }
}
