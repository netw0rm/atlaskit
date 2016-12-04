import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'isomorphic-style-loader!../less/Spacer.less';
import withStyles from '../../utils/withStyles';

class Spacer extends Component {
  static get propTypes() {
    return {
      width: PropTypes.number,
      shouldAnimate: PropTypes.bool,
    };
  }
  static get defaultProps() {
    return {
      width: 0,
      shouldAnimate: false,
    };
  }
  render() {
    return (
      <div
        className={classNames(styles.spacer, {
          [styles.shouldAnimate]: this.props.shouldAnimate,
        })}
        style={{
          width: this.props.width,
        }}
      />
    );
  }
}

export default withStyles(styles)(Spacer);
