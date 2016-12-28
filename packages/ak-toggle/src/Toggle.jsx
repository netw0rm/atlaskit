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
    value: PropTypes.string,
    labelWhenChecked: PropTypes.string,
    labelWhenUnchecked: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    labelWhenChecked: 'checked',
    labelWhenUnchecked: 'unchecked',
  };

  componentDidUpdate() {
    // TODO: This is a hack. find a way to make it work with preventDefault onMouseDown event
    if (this.mouseWasDown) {
      this.input.blur();
      this.mouseWasDown = false;
    }
  }

  onMouseDown = () => (
    this.mouseWasDown = true
  )

  getToggleClasses = () => classnames({
    [styles.toggle]: true,
    [styles.disabled]: this.props.isDisabled,
  });

  renderIcons = () => {
    if (this.props.isChecked) {
      return <ConfirmIcon label={this.props.labelWhenChecked} />;
    }
    return <CloseIcon label={this.props.labelWhenUnchecked} />;
  }

  render() {
    const id = uid();
    return (
      <label
        htmlFor={id}
        className={this.getToggleClasses()}
        onMouseDown={this.onMouseDown}
      >
        <input
          ref={el => (this.input = el)}
          className={styles.input}
          id={id}
          value={this.props.value}
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
              {this.renderIcons()}
            </div>
          </div>
        </div>
      </label>
    );
  }
}
