import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ResizerButton.less';
import classNames from 'classnames';

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
