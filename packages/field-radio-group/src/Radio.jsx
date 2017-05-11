import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import styles from './styles.less';

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable-next-line react/prefer-stateless-function */
export default class Radio extends PureComponent {
  static propTypes = {
    /** Sets whether the radio button is selectable. */
    isDisabled: PropTypes.bool,
    /** Mark whether this field is required for form validation. */
    isRequired: PropTypes.bool,
    /** Item is selected. Note: Only one radio button can be selected in each group. */
    isSelected: PropTypes.bool,
    /** Name of the radio button group the radio button belongs to. */
    name: PropTypes.string,
    /** Handler called when item changes. */
    onChange: PropTypes.func.isRequired,
    /** The value to be submitted by the form if this button is selected. */
    value: PropTypes.string,
    /** Component to render as the label for the radio button. */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }

  render() {
    return (
      <div>
        <label>
          <span className={styles.inputWrapper}>
            <input
              className={styles.input}
              checked={this.props.isSelected}
              disabled={this.props.isDisabled}
              name={this.props.name}
              onChange={this.props.onChange}
              required={this.props.isRequired}
              value={this.props.value}
              type="radio"
            />
            <span
              className={classnames(styles.radioIcon, {
                [styles.disabled]: this.props.isDisabled,
                [styles.selected]: this.props.isSelected,
              })}
            />
          </span>
          <span>
            {this.props.children}
          </span>
        </label>
      </div>
    );
  }
}
/* eslint-enable jsx-a11y/label-has-for */
