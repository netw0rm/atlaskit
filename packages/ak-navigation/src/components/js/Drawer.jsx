import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from 'isomorphic-style-loader!../less/Drawer.less';

class Drawer extends Component {
  static get propTypes() {
    return {
      open: PropTypes.bool,
      wide: PropTypes.bool,
      children: PropTypes.element,
    };
  }
  static get defaultProps() {
    return {
      wide: false,
      open: false,
    };
  }

  render() {
    return (
      <div
        className={classNames(styles.drawer, {
          [styles.open]: this.props.open,
          [styles.wide]: this.props.wide,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(Drawer);
