import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import AutofocusInput from './AutofocusInput';

export default class TextInput extends PureComponent {
  static propTypes = {
    /**
     * @description The value of the input field.
     * @memberof TextInput
     * @instance
     * @type {string}
     */
    value: PropTypes.string,
    /**
     *
     */
    fontSize: PropTypes.number,
    /**
     * @description Whether the component is in edit mode or read mode.
     * @memberof TextInput
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Callback to update input value.
     * @memberof TextInput
     * @instance
     * @type {Function}
     */
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fontSize: 14,
    isEditing: false,
  }

  renderEditView = () => (
    <AutofocusInput
      value={this.props.value}
      fontSize={this.props.fontSize}
      onChange={this.props.onChange}
    />
  )

  renderReadView = () => (
    <span className={styles.font} style={{ fontSize: this.props.fontSize }}>
      {this.props.value}
    </span>
  )

  render = () => (
    this.props.isEditing ? this.renderEditView() : this.renderReadView()
  )
}
