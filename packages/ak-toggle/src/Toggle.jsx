import uid from 'uid';
import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import styles from 'style!./styles.less';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';

export default class Toggle extends PureComponent {
  static propTypes = {
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    isDefaultFocused: false,
    name: '',
  };

  getToggleClasses = () => classnames({
    [styles.toggle]: true,
    [styles.disabled]: this.props.isDisabled,
  });

  render() {
    const id = uid();
    return (
      <label
        htmlFor={id}
        className={this.getToggleClasses()}
      >
        <input
          ref={el => (this.input = el)}
          className={styles.input}
          id={id}
          checked={this.props.isChecked}
          disabled={this.props.isDisabled}
          name={this.props.name}
          onChange={this.props.onChange}
          type="checkbox"
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <div className={styles.toggleSlide}>
          <div className={styles.toggleInner}>
            <div className={styles.iconWrapper}>
              {this.props.isChecked ? <ConfirmIcon /> : <CloseIcon />}
            </div>
          </div>
        </div>
      </label>
    );
  }
}
