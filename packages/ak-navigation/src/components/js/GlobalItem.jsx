import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from 'isomorphic-style-loader!../less/GlobalItem.less';

class GlobalItem extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      onActivate: PropTypes.func,
    };
  }
  static get defaultProps() {
    return {
      onActivate: () => {},
    };
  }

  render() {
    return (
      <button
        onClick={() => this.props.onActivate()}
        onMouseDown={e => e.preventDefault()}
        tabIndex="0"
        className={styles.globalItem}
      >
        {this.props.children}
      </button>
    );
  }
}

export default withStyles(styles)(GlobalItem);
