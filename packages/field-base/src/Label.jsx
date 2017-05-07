import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

export default class Label extends PureComponent {
  static propTypes = {
    /** the label text to display */
    label: PropTypes.string.isRequired,
    /** whether to hide the label */
    isLabelHidden: PropTypes.bool,
    /** onclick handler */
    onClick: PropTypes.func,
    /** show a style indicating that the label is for a required field */
    isRequired: PropTypes.bool,
    /** the labels control element */
    htmlFor: PropTypes.string,
    /** any children to render, displayed underneath the label */
    children: PropTypes.node,
    /** controls the appearance of the label */
    appearance: PropTypes.oneOf(['default', 'inline-edit']),
    /** controls the top margin of the label */
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
          {this.props.isRequired ?
            <span role="presentation" className={styles.requiredAsterisk}>*</span>
            : null
          }
        </div>
        {this.props.children}
      </label>
    );
  }
}
