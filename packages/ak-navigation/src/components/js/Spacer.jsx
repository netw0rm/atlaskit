import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/Spacer.less';

export default class Spacer extends Component {
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
        className={classNames(styles.locals.spacer, {
          [styles.locals.shouldAnimate]: this.props.shouldAnimate,
        })}
        style={{
          width: this.props.width,
        }}
      >
        <style>{styles.toString()}</style>
      </div>
    );
  }
}
