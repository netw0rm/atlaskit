import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./styles.less';

/*
  eslint-disable
    jsx-a11y/label-has-for,
    jsx-a11y/no-static-element-interactions,
    react/prefer-stateless-function
*/
export default class Label extends PureComponent {
  static propTypes = {
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     *
     * @memberof FieldBase
     * @type {string}
     * @example <FieldBase label="Email" />
     */
    label: PropTypes.string.isRequired,
    /**
     * @description Whether the field should show a label above it.
     *
     * If set to true no label will be shown and no space will be reserved for it.
     *
     * **Note**: You must still provide a label for the component regardless of this prop.
     * The label is also used to make the field accessible to screen readers.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase label="First Name" shouldHideLabel />
     */
    isLabelHidden: PropTypes.bool,
    /**
     * @description Callback that is called whenever the Label is clicked
     *
     * @memberof FieldBase
     * @type {Function}
     * @default () => void
     * @example <FieldBase onLabelClick={() => alert('label click!')} />
     */
    onClick: PropTypes.func,
    htmlFor: PropTypes.string,
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase label="First Name" isRequired" />
     */
    isRequired: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    const labelClasses = classNames(styles.labelText, {
      [styles.hidden]: this.props.isLabelHidden,
    });
    // we render the label in a span that is in a div so that the label itself will be
    // display: block but we can put the click handler on the span so that clicking
    // white space after the label doesnt call anything
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
