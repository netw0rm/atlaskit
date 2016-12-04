import React, { Component, PropTypes } from 'react';
import styles from 'isomorphic-style-loader!../less/GlobalItem.less';
import withStyles from '../../utils/withStyles';

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
