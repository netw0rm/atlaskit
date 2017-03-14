import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./styles.less';

export default class Label extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isLabelHidden: PropTypes.bool,
    onClick: PropTypes.func,
    isRequired: PropTypes.bool,
    htmlFor: PropTypes.string,
    children: PropTypes.node,
    appearance: PropTypes.oneOf(['default', 'inline-edit']),
    isFirstChild: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const labelClasses = classNames(styles.labelText, {
      [styles.hidden]: this.props.isLabelHidden,
      [styles.inlineEdit]: this.props.appearance === 'inline-edit',
      [styles.firstChild]: this.props.isFirstChild,
    });

    return (
      <label className={styles.label} htmlFor={this.props.htmlFor}>
        <div className={labelClasses}>
          <span onClick={this.props.onClick}>{this.props.label}</span>
          {this.props.isRequired ? <span className={styles.required}>*</span> : null}
        </div>
        {this.props.children}
      </label>
    );
  }
}
