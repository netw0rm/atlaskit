import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

/*
  eslint-disable
    jsx-a11y/label-has-for,
    jsx-a11y/no-static-element-interactions,
    react/prefer-stateless-function
*/
export default class Label extends PureComponent {
  static propTypes = {
    hideLabel: PropTypes.bool,
    label: PropTypes.string,
    onLabelClick: PropTypes.func,
    required: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    const labelClasses = classNames(styles.locals.labelText, {
      [styles.locals.hidden]: this.props.hideLabel,
    });
    // we render the label in a span that is in a div so that the label itself will be
    // display: block but we can put the click handler on the span so that clicking
    // white space after the label doesnt call anything
    return (
      <label className={styles.locals.label}>
        <div className={labelClasses}>
          <span onClick={this.props.onLabelClick}>{this.props.label}</span>
          {this.props.required ? <span className={styles.locals.required}>*</span> : null}
        </div>
        {this.props.children}
      </label>
    );
  }
}
