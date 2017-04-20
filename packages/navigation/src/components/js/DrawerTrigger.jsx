import React, { PureComponent, PropTypes } from 'react';
import styles from '../less/DrawerTrigger.less';

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
        className={styles.drawerTrigger}
        onClick={this.props.onActivate}
        onMouseDown={e => e.preventDefault()}
      >
        {this.props.children}
      </button>
    );
  }
}
