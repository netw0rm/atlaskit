import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/Spacer.less';

export default class Spacer extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    shouldAnimate: PropTypes.bool,
  }
  static defaultProps = {
    width: 0,
    shouldAnimate: false,
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
