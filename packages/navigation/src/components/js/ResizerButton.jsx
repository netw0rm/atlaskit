import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/ResizerButton.less';

export default class ResizerButton extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    isPointingRight: PropTypes.bool,
    onClick: PropTypes.func,
  }
  render() {
    return (
      <button
        onMouseDown={e => e.preventDefault()}
        onClick={this.props.onClick}
        className={classNames(styles.button, {
          [styles.isVisible]: this.props.isVisible,
          [styles.isPointingRight]: this.props.isPointingRight,
        })}
        aria-expanded={!this.props.isPointingRight}
      />
    );
  }
}
